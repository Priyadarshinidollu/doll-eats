"use client";

import React from "react";
import Image from "next/image";
import { MenuItem } from "@/data/menu";
import { useCart } from "@/features/header/hooks/useCart";

type CartItemProps = {
  item: MenuItem;
  quantity: number;
};

const CartItem = ({ item, quantity }: CartItemProps) => {
  const { updateCartItemQuantity, removeFromCart } = useCart();

  const { id, name, price, image, isVeg } = item;

  const itemTotal = price * quantity;

  return (
    <div className="group rounded-2xl border border-zinc-800 bg-zinc-950 p-4 transition duration-300 hover:border-amber-500/30">
      <div className="flex gap-4">
        {/* IMAGE */}
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="96px"
          />

          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* CONTENT */}
        <div className="min-w-0 flex-1">
          {/* TOP ROW */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                    isVeg ? "bg-green-400" : "bg-red-500"
                  }`}
                />

                <h3 className="truncate text-base font-semibold text-white sm:text-lg">
                  {name}
                </h3>
              </div>

              <p className="mt-1 text-sm text-zinc-500">₹{price} each</p>
            </div>

            {/* ITEM TOTAL */}
            <p className="shrink-0 text-lg font-bold text-amber-400">
              ₹{itemTotal}
            </p>
          </div>

          {/* BOTTOM ROW */}
          <div className="mt-4 flex items-center justify-between">
            {/* REMOVE */}
            <button
              type="button"
              onClick={() => removeFromCart(id)}
              className="text-xs font-medium text-zinc-600 transition hover:text-red-400 sm:text-sm"
            >
              Remove
            </button>

            {/* QUANTITY */}
            <div className="flex h-9 items-center overflow-hidden rounded-full border border-zinc-700 bg-zinc-900">
              <button
                type="button"
                aria-label={`Decrease ${name} quantity`}
                onClick={() => {
                  if (quantity === 1) {
                    removeFromCart(id);
                  } else {
                    updateCartItemQuantity(id, -1);
                  }
                }}
                className="flex h-9 w-9 items-center justify-center text-lg text-white transition hover:bg-zinc-800"
              >
                −
              </button>

              <span className="w-8 text-center text-sm font-semibold text-white">
                {quantity}
              </span>

              <button
                type="button"
                aria-label={`Increase ${name} quantity`}
                onClick={() => updateCartItemQuantity(id, 1)}
                className="flex h-9 w-9 items-center justify-center bg-amber-400 text-lg text-black transition hover:bg-amber-300"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
