import React from "react";

const WHATSAPP_NUMBER = "919949959202";

const Contact = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Doll Eats! I would like to know more about your food.",
  )}`;

  return (
    <section
      id="contact"
      className="border-t border-zinc-900 bg-[#070707] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            {/* Content */}
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400">
                Get in Touch
              </p>

              <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
                Craving something
                <span className="block text-amber-400">delicious?</span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-500 sm:text-base">
                Have a question about our menu, your order, or simply want to
                talk food? We&apos;re just a WhatsApp message away.
              </p>

              {/* Contact number */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10">
                  <span className="text-lg">💬</span>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-600">
                    WhatsApp
                  </p>

                  <p className="mt-1 text-sm font-medium text-zinc-200">
                    +91 99499 59202
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-14 items-center justify-center gap-3 rounded-full bg-amber-400 px-8 font-semibold text-black transition hover:bg-amber-300 active:scale-[0.98]"
              >
                <span className="text-xl">💬</span>

                <span>Chat on WhatsApp</span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <p className="mt-3 text-center text-xs text-zinc-600">
                We&apos;d love to hear from you
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
