"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/features/header/hooks/useCart";
import menuItems from "@/data/menu";

const FREE_DELIVERY_LIMIT = 500;
const DELIVERY_FEE = 40;
const TAX_RATE = 0.05;

const OrderSummary = () => {
  const { cart } = useCart();

  const subtotal = cart.reduce((total, cartItem) => {
    const menuItem = menuItems.find((item) => item.id === cartItem.id);

    if (!menuItem) return total;

    return total + menuItem.price * cartItem.quantity;
  }, 0);

  const deliveryFee = subtotal >= FREE_DELIVERY_LIMIT ? 0 : DELIVERY_FEE;

  const tax = Math.round(subtotal * TAX_RATE);

  const total = subtotal + deliveryFee + tax;

  const remainingForFreeDelivery = Math.max(FREE_DELIVERY_LIMIT - subtotal, 0);

  const freeDeliveryProgress = Math.min(
    (subtotal / FREE_DELIVERY_LIMIT) * 100,
    100,
  );

  return (
    <div className="lg:sticky lg:top-24">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        {/* HEADER */}
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-amber-400">
            Checkout
          </p>

          <h2 className="mt-2 text-xl font-semibold text-white">
            Order Summary
          </h2>

          <p className="mt-1 text-sm text-zinc-500">Review your order total</p>
        </div>

        {/* FREE DELIVERY */}
        <div className="mt-6 rounded-xl border border-zinc-800 bg-black/30 p-4">
          {remainingForFreeDelivery > 0 ? (
            <>
              <p className="text-sm text-zinc-300">
                Add{" "}
                <span className="font-semibold text-amber-400">
                  ₹{remainingForFreeDelivery}
                </span>{" "}
                more for free delivery
              </p>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all duration-500"
                  style={{
                    width: `${freeDeliveryProgress}%`,
                  }}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 text-sm text-green-400">
              <span>✓</span>
              <span>You unlocked free delivery!</span>
            </div>
          )}
        </div>

        {/* PRICING */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">Subtotal</span>

            <span className="text-zinc-200">₹{subtotal}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">Delivery</span>

            <span
              className={
                deliveryFee === 0
                  ? "font-medium text-green-400"
                  : "text-zinc-200"
              }
            >
              {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">Tax</span>

            <span className="text-zinc-200">₹{tax}</span>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-6 h-px bg-zinc-800" />

        {/* TOTAL */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-zinc-500">Total</p>

            <p className="mt-1 text-xs text-zinc-600">
              Inclusive of applicable taxes
            </p>
          </div>

          <p className="text-2xl font-bold text-amber-400">₹{total}</p>
        </div>

        {/* CHECKOUT */}
        <Link
          href="/checkout"
          className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-amber-400 font-semibold text-black transition hover:bg-amber-300 active:scale-[0.98]"
        >
          Proceed to Checkout
        </Link>

        {/* PAYMENT NOTE */}
        <p className="mt-4 text-center text-xs text-zinc-600">
          Secure checkout • Multiple payment options
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
