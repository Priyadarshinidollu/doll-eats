import React from "react";
import Link from "next/link";

const offers = [
  {
    id: 1,
    badge: "BEST VALUE",
    title: "Family Feast",
    description:
      "A delicious spread for the whole family with your favorite Indian dishes.",
    discount: "25% OFF",
    code: "FAMILY25",
    icon: "🍛",
  },
  {
    id: 2,
    badge: "POPULAR",
    title: "Weekend Special",
    description:
      "Enjoy your weekend with authentic flavors and exclusive savings.",
    discount: "20% OFF",
    code: "WEEKEND20",
    icon: "🔥",
  },
  {
    id: 3,
    badge: "NEW",
    title: "First Order",
    description:
      "Welcome to Doll Eats! Get a special discount on your first order.",
    discount: "30% OFF",
    code: "WELCOME30",
    icon: "✨",
  },
];

const Offers = () => {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] px-4 py-16 sm:px-6 lg:px-8">
      {/* Decorative background */}
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-amber-400" />

              <span className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400">
                Special Deals
              </span>
            </div>

            <h2 className="font-serif text-4xl font-bold text-white sm:text-5xl">
              Delicious <span className="text-amber-400">Offers</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
              Great food tastes even better when you get a little extra. Explore
              our special offers and enjoy more for less.
            </p>
          </div>

          <Link
            href="/menu"
            className="text-sm font-medium text-amber-400 transition hover:text-amber-300"
          >
            Explore Menu →
          </Link>
        </div>

        {/* Offers Grid */}
        <div className="grid gap-5 md:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-500/40"
            >
              {/* Decorative circle */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-500/5 transition duration-500 group-hover:scale-150" />

              {/* Top row */}
              <div className="relative flex items-start justify-between">
                <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[10px] font-semibold tracking-wider text-amber-400">
                  {offer.badge}
                </span>

                <span className="text-3xl">{offer.icon}</span>
              </div>

              {/* Offer */}
              <div className="relative mt-6">
                <p className="text-sm text-zinc-500">Get</p>

                <h3 className="mt-1 font-serif text-2xl font-bold text-white">
                  {offer.title}
                </h3>

                <div className="mt-3">
                  <span className="text-4xl font-bold text-amber-400">
                    {offer.discount}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {offer.description}
                </p>
              </div>

              {/* Coupon */}
              <div className="relative mt-6 flex items-center justify-between rounded-xl border border-dashed border-zinc-700 bg-black/40 p-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                    Use code
                  </p>

                  <p className="mt-1 text-sm font-semibold tracking-wider text-white">
                    {offer.code}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(offer.code)}
                  className="rounded-lg bg-amber-400 px-3 py-2 text-xs font-semibold text-black transition hover:bg-amber-300"
                >
                  Copy
                </button>
              </div>

              {/* CTA */}
              <Link
                href="/menu"
                className="relative mt-4 flex h-11 w-full items-center justify-center rounded-full border border-zinc-700 text-sm font-medium text-zinc-200 transition hover:border-amber-400 hover:text-amber-400"
              >
                Order Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
