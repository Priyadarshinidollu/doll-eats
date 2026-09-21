import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";
import { query } from "@/lib/db";
import { getRazorpayClient } from "@/lib/razorpay";
import { calculateOrderTotals } from "@/lib/pricing";
import { getMenuItemById } from "@/lib/menu";

type CartItemInput = { id: string; quantity: number };

type CustomerInput = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  landmark?: string;
};

type OrderRow = {
  id: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  amount: number;
  currency: string;
  status: string;
  payment_method: string;
  items: { id: string; name: string; price: number; quantity: number }[];
  address: string;
  city: string;
  pincode: string;
  landmark: string | null;
  created_at: string;
};

function parseCustomer(input: unknown): CustomerInput | null {
  if (typeof input !== "object" || input === null) return null;
  const c = input as Record<string, unknown>;

  if (
    typeof c.name !== "string" ||
    typeof c.email !== "string" ||
    typeof c.phone !== "string" ||
    typeof c.address !== "string" ||
    typeof c.city !== "string" ||
    typeof c.pincode !== "string"
  ) {
    return null;
  }

  return {
    name: c.name,
    email: c.email,
    phone: c.phone,
    address: c.address,
    city: c.city,
    pincode: c.pincode,
    landmark: typeof c.landmark === "string" ? c.landmark : undefined,
  };
}

export async function GET() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const result = await query<OrderRow>(
    `SELECT id, razorpay_order_id, razorpay_payment_id, amount, currency, status,
            payment_method, items, address, city, pincode, landmark, created_at
     FROM orders
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [session.user.id],
  );

  return NextResponse.json({ orders: result.rows });
}

export async function POST(request: NextRequest) {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);

  const items: unknown = body?.items;
  const customer = parseCustomer(body?.customer);
  const paymentMethod = body?.paymentMethod;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  if (!customer) {
    return NextResponse.json(
      { error: "Missing or invalid customer details" },
      { status: 400 },
    );
  }

  if (paymentMethod !== "upi" && paymentMethod !== "card") {
    return NextResponse.json(
      { error: "Invalid payment method" },
      { status: 400 },
    );
  }

  // Never trust client-supplied prices - resolve every line item against
  // the server-side menu so the charged amount can't be tampered with.
  const orderLines: { id: string; name: string; price: number; quantity: number }[] =
    [];

  for (const rawItem of items as CartItemInput[]) {
    const menuItem = rawItem?.id ? await getMenuItemById(rawItem.id) : null;
    const quantity = Number(rawItem?.quantity);

    if (!menuItem || !menuItem.available || !Number.isInteger(quantity) || quantity <= 0) {
      return NextResponse.json(
        { error: "Cart contains an invalid or unavailable item" },
        { status: 400 },
      );
    }

    orderLines.push({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity,
    });
  }

  const { total } = calculateOrderTotals(orderLines);
  const amountInPaise = Math.round(total * 100);

  if (amountInPaise < 100) {
    return NextResponse.json(
      { error: "Order amount must be at least ₹1" },
      { status: 400 },
    );
  }

  let razorpayOrder;
  try {
    const razorpay = getRazorpayClient();
    razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });
  } catch (error) {
    console.error("Razorpay order creation failed", error);
    const statusCode = (error as { statusCode?: number })?.statusCode;
    const status = statusCode === 401 ? 401 : 500;
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status },
    );
  }

  let internalOrderId: string;
  try {
    const result = await query<{ id: string }>(
      `INSERT INTO orders (
        user_id, razorpay_order_id, amount, currency, status, payment_method, receipt,
        items, customer_name, customer_phone, customer_email, address, city, pincode, landmark
      ) VALUES ($1,$2,$3,$4,'created',$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      RETURNING id`,
      [
        session.user.id,
        razorpayOrder.id,
        razorpayOrder.amount,
        razorpayOrder.currency,
        paymentMethod,
        razorpayOrder.receipt,
        JSON.stringify(orderLines),
        customer.name,
        customer.phone,
        customer.email,
        customer.address,
        customer.city,
        customer.pincode,
        customer.landmark ?? null,
      ],
    );
    internalOrderId = result.rows[0].id;
  } catch (error) {
    console.error("Failed to persist order", error);
    return NextResponse.json(
      { error: "Failed to save order" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    paymentMethod,
    orderId: internalOrderId,
    order_id: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
  });
}
