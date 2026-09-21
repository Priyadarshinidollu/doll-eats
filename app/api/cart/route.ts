import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";
import { query } from "@/lib/db";
import { getMenuItemById } from "@/lib/menu";

type CartItemRow = { item_id: string; quantity: number };

async function requireUserId() {
  const { data: session } = await auth.getSession();
  return session?.user?.id ?? null;
}

export async function GET() {
  const userId = await requireUserId();

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const result = await query<CartItemRow>(
    `SELECT item_id, quantity FROM cart_items WHERE user_id = $1`,
    [userId],
  );

  const items = result.rows.map((row) => ({
    id: row.item_id,
    quantity: row.quantity,
  }));

  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const userId = await requireUserId();

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : null;
  const quantityDelta = Number(body?.quantityDelta);

  if (!id || !(await getMenuItemById(id))) {
    return NextResponse.json({ error: "Invalid item id" }, { status: 400 });
  }

  if (!Number.isInteger(quantityDelta) || quantityDelta === 0) {
    return NextResponse.json(
      { error: "quantityDelta must be a nonzero integer" },
      { status: 400 },
    );
  }

  const result = await query<{ quantity: number }>(
    `INSERT INTO cart_items (user_id, item_id, quantity)
     VALUES ($1, $2, GREATEST($3, 0))
     ON CONFLICT (user_id, item_id)
     DO UPDATE SET quantity = GREATEST(cart_items.quantity + $3, 0), updated_at = now()
     RETURNING quantity`,
    [userId, id, quantityDelta],
  );

  const quantity = result.rows[0]?.quantity ?? 0;

  if (quantity <= 0) {
    await query(
      `DELETE FROM cart_items WHERE user_id = $1 AND item_id = $2`,
      [userId, id],
    );
  }

  return NextResponse.json({ id, quantity: Math.max(quantity, 0) });
}

export async function DELETE(request: NextRequest) {
  const userId = await requireUserId();

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    // No id given - clear the whole cart (used after an order is placed).
    await query(`DELETE FROM cart_items WHERE user_id = $1`, [userId]);
    return NextResponse.json({ success: true });
  }

  await query(`DELETE FROM cart_items WHERE user_id = $1 AND item_id = $2`, [
    userId,
    id,
  ]);

  return NextResponse.json({ success: true });
}
