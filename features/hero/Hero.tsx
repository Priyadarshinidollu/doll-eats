import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://pngmagic.com/product_images/restaurant-website-hero-background-for-landing-page_T6PO.jpg"
          fill
          priority
          sizes="100vw"
          alt="Delicious Indian food"
          className="object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Left-to-right gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      </div>

      {/* Hero Woman */}
      <div className="pointer-events-none absolute bottom-0 right-[-40px] z-[5] w-[75%] sm:right-[-20px] sm:w-[60%] lg:right-0 lg:w-[52%] lg:max-w-[650px]">
        <Image
          src="/assets/hero/priya-hero.png"
          alt="Woman enjoying a burger"
          width={1000}
          height={900}
          priority
          className="h-auto w-full object-contain object-right-bottom"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[700px] sm:min-h-[650px] lg:min-h-[600px] items-center px-6 py-16 sm:px-10 lg:min-h-[600px] lg:px-16">
        <div className="max-w-[85%] sm:max-w-2xl lg:max-w-[55%]">
          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-amber-400" />

            <span className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400">
              Good Food • Better Mood
            </span>

            <span className="h-px w-10 bg-amber-400" />
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
            Delicious Food
            <br />
            For <span className="text-amber-400">Every Mood</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
            Discover a variety of mouth-watering dishes, crafted with fresh
            ingredients and authentic flavors.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            {/* Primary button */}
            <Link
              href="/menu"
              className="group flex h-12 items-center gap-3 rounded-full bg-amber-400 px-7 font-semibold text-black shadow-lg shadow-amber-500/20 transition duration-300 hover:bg-amber-300 hover:shadow-amber-500/30"
            >
              Explore Menu
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            {/* Secondary button */}
            <Link
              href="#about"
              className="flex h-12 items-center gap-3 rounded-full border border-amber-400/60 bg-black/20 px-7 font-medium text-white backdrop-blur-sm transition duration-300 hover:bg-amber-400/10"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-400 text-xs text-amber-400">
                ▶
              </span>
              Our Story
            </Link>
          </div>

          {/* Features */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-5 border-t border-white/10 pt-6">
            {/* Feature 1 */}
            <div className="flex items-center gap-3">
              <span className="text-xl text-amber-400">♧</span>

              <div>
                <p className="text-sm font-medium text-white">Fresh</p>
                <p className="text-xs text-zinc-400">Ingredients</p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden h-10 w-px bg-white/10 sm:block" />

            {/* Feature 2 */}
            <div className="flex items-center gap-3">
              <span className="text-xl text-amber-400">♨</span>

              <div>
                <p className="text-sm font-medium text-white">Authentic</p>
                <p className="text-xs text-zinc-400">Recipes</p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden h-10 w-px bg-white/10 sm:block" />

            {/* Feature 3 */}
            <div className="flex items-center gap-3">
              <span className="text-xl text-amber-400">♡</span>

              <div>
                <p className="text-sm font-medium text-white">Made</p>
                <p className="text-xs text-zinc-400">With Love</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute right-6 top-6 z-10 hidden h-16 w-16 rounded-full border border-amber-400/20 sm:block">
        <div className="absolute inset-2 rounded-full border border-amber-400/10" />
      </div>
    </section>
  );
};

export default Hero;
