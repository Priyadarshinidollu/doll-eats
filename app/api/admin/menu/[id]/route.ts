import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin";
import { query } from "@/lib/db";

type MenuItemPatch = Partial<{
  name: string;
  category: string;
  cuisine: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  isVeg: boolean;
  spicyLevel: number;
  prepTime: number;
  calories: number;
  available: boolean;
  bestseller: boolean;
  tags: string[];
  image: string;
}>;

const COLUMN_MAP: Record<keyof MenuItemPatch, string> = {
  name: "name",
  category: "category",
  cuisine: "cuisine",
  price: "price",
  originalPrice: "original_price",
  rating: "rating",
  reviewCount: "review_count",
  isVeg: "is_veg",
  spicyLevel: "spicy_level",
  prepTime: "prep_time",
  calories: "calories",
  available: "available",
  bestseller: "bestseller",
  tags: "tags",
  image: "image",
};

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/admin/menu/[id]">,
) {
  const admin = await requireAdminSession();

  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await ctx.params;
  const body = await request.json().catch(() => null);

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const setClauses: string[] = [];
  const values: unknown[] = [];

  for (const [key, column] of Object.entries(COLUMN_MAP) as [
    keyof MenuItemPatch,
    string,
  ][]) {
    if (!(key in body)) continue;
    values.push(body[key]);
    setClauses.push(`${column} = $${values.length}`);
  }

  if (setClauses.length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  values.push(id);

  const result = await query(
    `UPDATE menu_items SET ${setClauses.join(", ")}, updated_at = now()
     WHERE id = $${values.length}
     RETURNING id`,
    values,
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/admin/menu/[id]">,
) {
  const admin = await requireAdminSession();

  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await ctx.params;

  const result = await query(
    `DELETE FROM menu_items WHERE id = $1 RETURNING id`,
    [id],
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
