import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { query } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  const razorpay_order_id = body?.razorpay_order_id;
  const razorpay_payment_id = body?.razorpay_payment_id;
  const razorpay_signature = body?.razorpay_signature;

  if (
    typeof razorpay_order_id !== "string" ||
    typeof razorpay_payment_id !== "string" ||
    typeof razorpay_signature !== "string"
  ) {
    return NextResponse.json(
      { error: "Missing payment verification fields" },
      { status: 400 },
    );
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    console.error("RAZORPAY_KEY_SECRET is not configured");
    return NextResponse.json(
      { error: "Payment gateway is not configured" },
      { status: 500 },
    );
  }

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const expectedBuffer = Buffer.from(expectedSignature, "hex");
  const receivedBuffer = Buffer.from(razorpay_signature, "hex");

  const isValid =
    expectedBuffer.length === receivedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, receivedBuffer);

  if (!isValid) {
    await query(
      `UPDATE orders SET status = 'failed', updated_at = now() WHERE razorpay_order_id = $1`,
      [razorpay_order_id],
    ).catch((error) => console.error("Failed to mark order as failed", error));

    return NextResponse.json(
      { success: false, error: "Payment verification failed" },
      { status: 400 },
    );
  }

  let orderId: string;
  try {
    const result = await query<{ id: string }>(
      `UPDATE orders
       SET status = 'paid', razorpay_payment_id = $2, updated_at = now()
       WHERE razorpay_order_id = $1
       RETURNING id`,
      [razorpay_order_id, razorpay_payment_id],
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    orderId = result.rows[0].id;
  } catch (error) {
    console.error("Failed to record verified payment", error);
    return NextResponse.json(
      { error: "Failed to record payment" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, orderId });
}
