import React from "react";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <section
      id="about"
      className="border-t border-zinc-900 bg-[#0a0a0a] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 max-w-2xl lg:mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400">
            Our Story
          </p>

          <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Food that feels
            <span className="block text-amber-400">like home.</span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-zinc-500 sm:text-base">
            At Doll Eats, we believe great food is more than just a meal.
            It&apos;s the aroma that brings back memories, the flavors that
            bring people together, and the little moments that make a day
            better.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-zinc-800">
              <Image
                src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85"
                alt="Fresh Indian food served at Doll Eats"
                fill
                className="object-cover transition duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Cinematic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Image Badge */}
              <div className="absolute bottom-6 left-6 rounded-2xl border border-white/20 bg-black/50 px-5 py-4 backdrop-blur-md">
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-zinc-400">
                  Made with love
                </p>
              </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute -bottom-4 -right-4 -z-0 h-24 w-24 rounded-br-3xl border-b border-r border-amber-500/40" />
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-600">
              Why Doll Eats?
            </p>

            <h3 className="mt-3 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
              Authentic flavors.
              <br />
              <span className="text-amber-400">Made for today.</span>
            </h3>

            <div className="mt-6 space-y-5 text-sm leading-7 text-zinc-500 sm:text-base">
              <p>
                We bring together the richness of traditional Indian cooking
                with the convenience of modern food ordering. From creamy
                curries to crispy dosas, every dish is chosen to give you a
                satisfying experience from the first bite to the last.
              </p>

              <p>
                Our menu is built around comforting classics, quality
                ingredients, and bold flavors. Whether you&apos;re ordering
                dinner for yourself or sharing a feast with family and friends,
                there&apos;s always something worth coming back for.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 border-y border-zinc-800 py-6">
              <div>
                <p className="text-2xl font-bold text-white sm:text-3xl">10+</p>
                <p className="mt-1 text-xs text-zinc-600 sm:text-sm">
                  Signature Dishes
                </p>
              </div>

              <div className="border-l border-zinc-800 pl-4 sm:pl-6">
                <p className="text-2xl font-bold text-white sm:text-3xl">4.8</p>
                <p className="mt-1 text-xs text-zinc-600 sm:text-sm">
                  Average Rating
                </p>
              </div>

              <div className="border-l border-zinc-800 pl-4 sm:pl-6">
                <p className="text-2xl font-bold text-white sm:text-3xl">
                  100%
                </p>
                <p className="mt-1 text-xs text-zinc-600 sm:text-sm">
                  Fresh Ingredients
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="/menu"
                className="inline-flex h-11 items-center justify-center rounded-full bg-amber-400 px-6 text-sm font-semibold text-black transition hover:bg-amber-300 active:scale-[0.98]"
              >
                Explore Our Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
