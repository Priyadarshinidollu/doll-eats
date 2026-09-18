"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/features/header/hooks/useCart";
import menuItems from "@/data/menu";

const OrderSummary = () => {
  const { cart } = useCart();

  const subtotal = cart.reduce((total, cartItem) => {
    const menuItem = menuItems.find((item) => item.id === cartItem.id);

    if (!menuItem) return total;

    return total + menuItem.price * cartItem.quantity;
  }, 0);

  const deliveryFee = subtotal >= 500 ? 0 : 40;

  const tax = Math.round(subtotal * 0.05);

  const total = subtotal + deliveryFee + tax;
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h2 className="text-lg font-semibold text-white">Order Summary</h2>

      <p className="mt-1 text-sm text-zinc-500">Review your order total</p>

      <div className="my-6 h-px bg-zinc-800" />

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">Subtotal</span>
          <span className="text-zinc-200">₹{subtotal}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">Delivery</span>
          <span className="text-zinc-200">₹{deliveryFee}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">Tax</span>
          <span className="text-zinc-200">₹{tax}</span>
        </div>
      </div>

      <div className="my-6 h-px bg-zinc-800" />

      <div className="flex items-center justify-between">
        <span className="text-base font-medium text-zinc-300">Total</span>

        <span className="text-2xl font-bold text-amber-400">₹{total}</span>
      </div>

      <Link
        href="/checkout"
        className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-amber-400 font-semibold text-black transition hover:bg-amber-300 active:scale-[0.98]"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default OrderSummary;
