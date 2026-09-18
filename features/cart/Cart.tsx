"use client";
import menuItems from "@/data/menu";
import React from "react";
import { useCart } from "../header/hooks/useCart";
import OrderSummary from "./OrderSummary";
import CartItem from "./CartItem";

const CartPage = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400">
          Your Order
        </p>

        <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
          Your Cart
        </h1>

        <p className="mt-3 text-zinc-400">
          Review your selected dishes before checkout.
        </p>
        <p className="mt-2 text-zinc-300"> Quantity: {totalItems}</p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* CART ITEMS */}
        <div className="space-y-4">
          {cart.map((cartItem) => {
            const menuItem = menuItems.find((item) => item.id === cartItem.id);

            if (!menuItem) return null;

            return (
              <CartItem
                key={cartItem.id}
                item={menuItem}
                quantity={cartItem.quantity}
              />
            );
          })}
        </div>

        {/* SUMMARY */}
        <div>
          <OrderSummary />
        </div>
      </div>
    </main>
  );
};

export default CartPage;
