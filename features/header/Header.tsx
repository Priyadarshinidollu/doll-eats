"use client";

import Link from "next/link";
import { useCart } from "./hooks/useCart";

const Header = () => {
  const { cart } = useCart();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#0a0a0a]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          {/* Logo icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-xl transition group-hover:border-amber-400/60 group-hover:bg-amber-500/20">
            🍛
          </div>

          {/* Logo text */}
          <div>
            <h1 className="font-serif text-xl font-bold tracking-wide text-white">
              Doll <span className="text-amber-400">Eats</span>
            </h1>

            <p className="hidden text-[9px] uppercase tracking-[0.25em] text-zinc-500 sm:block">
              Taste the Tradition
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm text-zinc-300 transition hover:text-amber-400"
          >
            Home
          </Link>

          <Link
            href="#menu"
            className="text-sm text-zinc-300 transition hover:text-amber-400"
          >
            Menu
          </Link>

          <Link
            href="#about"
            className="text-sm text-zinc-300 transition hover:text-amber-400"
          >
            About
          </Link>

          <Link
            href="#contact"
            className="text-sm text-zinc-300 transition hover:text-amber-400"
          >
            Contact
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Search */}
          {/* <button
            type="button"
            aria-label="Search"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-300 transition hover:border-amber-500/50 hover:text-amber-400 sm:flex"
          >
            <span className="text-lg">⌕</span>
          </button> */}

          {/* Cart */}
          <Link
            href="/cart"
            className="group relative flex h-11 items-center gap-2 rounded-full border border-amber-500/30 bg-zinc-950 px-4 text-sm font-medium text-white transition hover:border-amber-400 hover:bg-amber-500/10"
          >
            <span className="text-lg">🛒</span>

            <span className="hidden sm:inline">Cart</span>

            {/* Cart badge */}
            {cartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1.5 text-[11px] font-bold text-black">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Order button */}
          {/* <Link
            href="/menu"
            className="hidden h-11 items-center rounded-full bg-amber-400 px-5 text-sm font-semibold text-black transition hover:bg-amber-300 sm:flex"
          >
            Order Now
          </Link> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
