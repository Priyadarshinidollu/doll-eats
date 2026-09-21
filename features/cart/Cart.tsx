"use client";

import React from "react";
import { useCart } from "@/features/header/hooks/useCart";
import { useMenu } from "@/features/menu/hooks/useMenu";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import EmptyCart from "./EmptyCart";

const CartPage = () => {
  const { cart, isCartLoading } = useCart();
  const { menuItems } = useMenu();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400">
            Your Order
          </p>

          <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-serif text-4xl font-bold sm:text-5xl">
                Your Cart
              </h1>

              <p className="mt-3 text-zinc-400">
                Review your selected dishes before checkout.
              </p>
            </div>

            {totalItems > 0 && (
              <p className="text-sm text-zinc-500">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </p>
            )}
          </div>
        </div>

        {/* CONTENT */}
        {isCartLoading ? (
          <div className="mt-10 text-center text-sm text-zinc-500">
            Loading your cart...
          </div>
        ) : cart.length === 0 ? (
          <div className="mt-10">
            <EmptyCart />
          </div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* CART ITEMS */}
            <div className="space-y-4">
              {cart.map((cartItem) => {
                const menuItem = menuItems.find(
                  (item) => item.id === cartItem.id,
                );

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

            {/* ORDER SUMMARY */}
            <div>
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage;
