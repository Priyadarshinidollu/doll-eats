import React from "react";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="flex min-h-125 flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10 text-4xl">
        🛒
      </div>

      <h2 className="mt-6 font-serif text-2xl font-bold text-white">
        Your cart is empty
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
        Looks like you haven't added anything yet. Explore our menu and find
        something delicious.
      </p>

      <Link
        href="/"
        className="mt-6 flex h-11 items-center justify-center rounded-full bg-amber-400 px-6 font-semibold text-black transition hover:bg-amber-300 active:scale-[0.98]"
      >
        Explore Menu
      </Link>
    </div>
  );
};

export default EmptyCart;
