import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-zinc-800 bg-[#070707]">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 top-0 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* ================= TOP ================= */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-xl">
                🍛
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-white">
                  Doll <span className="text-amber-400">Eats</span>
                </h2>

                <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-600">
                  Taste the Tradition
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-zinc-500">
              Bringing authentic flavors, fresh ingredients, and unforgettable
              food experiences to your table.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              {["𝕏", "f", "◎", "in"].map((icon) => (
                <button
                  key={icon}
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 text-sm text-zinc-400 transition hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
              Explore
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-zinc-500 transition hover:text-amber-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/menu"
                  className="text-zinc-500 transition hover:text-amber-400"
                >
                  Our Menu
                </Link>
              </li>

              <li>
                <Link
                  href="/offers"
                  className="text-zinc-500 transition hover:text-amber-400"
                >
                  Offers
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-zinc-500 transition hover:text-amber-400"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
              Information
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-500 transition hover:text-amber-400"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-zinc-500 transition hover:text-amber-400"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-zinc-500 transition hover:text-amber-400"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="text-zinc-500 transition hover:text-amber-400"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
              Get In Touch
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <span className="text-amber-400">◉</span>

                <div>
                  <p className="text-zinc-300">Visit Us</p>
                  <p className="mt-1 text-zinc-600">Bangalore, India</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-amber-400">✆</span>

                <div>
                  <p className="text-zinc-300">Call Us</p>
                  <p className="mt-1 text-zinc-600">+91 123456789</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-amber-400">✉</span>

                <div>
                  <p className="text-zinc-300">Email</p>
                  <p className="mt-1 text-zinc-600">hello@dolleats.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="my-10 h-px bg-zinc-800" />

        {/* ================= BOTTOM ================= */}
        <div className="flex flex-col gap-4 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="text-zinc-600">
            © {new Date().getFullYear()} Doll Eats. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-zinc-600">
            <span>Made with</span>

            <span className="text-amber-400">♥</span>

            <span>for food lovers by Priyadarsini</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
