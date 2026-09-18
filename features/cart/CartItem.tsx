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
    <div className="flex gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
      {/* IMAGE */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      {/* CONTENT */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-white">
              {name}
            </h3>

            <div className="mt-1 flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isVeg ? "bg-green-400" : "bg-red-500"
                }`}
              />

              <p className="text-sm text-zinc-500">₹{price} each</p>
            </div>
          </div>

          {/* TOTAL */}
          <p className="shrink-0 text-lg font-semibold text-amber-400">
            ₹{itemTotal}
          </p>
        </div>

        {/* CONTROLS */}
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => removeFromCart(id)}
            className="text-sm text-zinc-500 transition hover:text-red-400"
          >
            Remove
          </button>

          <div className="flex h-9 items-center overflow-hidden rounded-full border border-zinc-700 bg-zinc-900">
            <button
              type="button"
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
              onClick={() => updateCartItemQuantity(id, 1)}
              className="flex h-9 w-9 items-center justify-center bg-amber-400 text-lg text-black transition hover:bg-amber-300"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
