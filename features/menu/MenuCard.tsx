import { MenuItem } from "@/data/menu";
import React from "react";
import Image from "next/image";
import { useCart } from "../header/hooks/useCart";

const MenuCard: React.FC<MenuItem> = (item) => {
  const { id, name, price, image, rating, isVeg, available } = item;

  const { addToCart, cart, updateCartItemQuantity, removeFromCart } = useCart();

  const menuItemInCart = cart.find((cartItem) => cartItem.id === id);

  const quantity = menuItemInCart?.quantity ?? 0;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-3 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-amber-500/10">
      {/* IMAGE */}
      <div className="relative h-48 w-full overflow-hidden rounded-xl">
        <Image
          src={image}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          alt={name}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Dark overlay */}
        <div className="absolute  inset-0  from-black/60 via-transparent to-transparent bg-linear-to-t" />

        {/* AVAILABLE STATUS */}
        <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-sm">
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              available ? "bg-green-400" : "bg-red-500"
            }`}
          />
        </div>

        {/* VEG / NON VEG */}
        <div className="absolute bottom-3 right-3 flex h-6 w-6 items-center justify-center rounded-md border border-white/50 bg-black/60 backdrop-blur-sm">
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              isVeg ? "bg-green-400" : "bg-red-500"
            }`}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-1 pt-3">
        {/* NAME */}
        <h3 className="truncate text-lg font-semibold text-white">{name}</h3>

        {/* PRICE + RATING */}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xl font-semibold text-amber-400">₹{price}</p>

          <div className="flex items-center gap-1 text-sm">
            <span className="text-amber-400">★</span>
            <span className="text-zinc-300">{rating}</span>
          </div>
        </div>

        {/* CART */}
        <div className="mt-4">
          {quantity > 0 ? (
            <div className="flex h-11 w-full items-center justify-between overflow-hidden rounded-full border border-amber-500/40 bg-zinc-900">
              {/* DECREASE */}
              <button
                onClick={() => {
                  if (quantity === 1) {
                    removeFromCart(id);
                  } else {
                    updateCartItemQuantity(id, -1);
                  }
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-white transition hover:bg-zinc-800"
              >
                −
              </button>

              {/* QUANTITY */}
              <span className="font-semibold text-white">{quantity}</span>

              {/* INCREASE */}
              <button
                onClick={() => updateCartItemQuantity(id, 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-xl font-medium text-black transition hover:bg-amber-300"
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-amber-400 font-semibold text-black transition hover:bg-amber-300 active:scale-[0.98]"
              onClick={() =>
                addToCart({
                  ...item,
                  quantity: 1,
                })
              }
            >
              <span className="text-lg">🛒</span>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
