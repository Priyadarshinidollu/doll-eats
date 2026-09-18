import React from "react";

type CheckoutForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  landmark: string;
  paymentMethod: "cod" | "upi" | "card";
};

type CustomerDetailsProps = {
  form: CheckoutForm;
  setForm: React.Dispatch<React.SetStateAction<CheckoutForm>>;
};

const CustomerDetails = ({ form, setForm }: CustomerDetailsProps) => {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-black">
          1
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white">Customer Details</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Tell us who we're preparing this order for.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {/* NAME */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Your name"
                className="h-11 w-full rounded-xl border border-zinc-800 bg-black/40 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10"
              />
            </div>

            {/* PHONE */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                placeholder="+91 98765 43210"
                className="h-11 w-full rounded-xl border border-zinc-800 bg-black/40 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10"
              />
            </div>

            {/* EMAIL */}
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                placeholder="you@example.com"
                className="h-11 w-full rounded-xl border border-zinc-800 bg-black/40 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerDetails;
