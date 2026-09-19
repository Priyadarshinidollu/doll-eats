import React from "react";

import { CheckoutForm } from "./type/CheckoutFormType";

type DeliveryAddressProps = {
  form: CheckoutForm;
  setForm: React.Dispatch<React.SetStateAction<CheckoutForm>>;
};

const DeliveryAddress = ({ form, setForm }: DeliveryAddressProps) => {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-black">
          2
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white">Delivery Address</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Where should we deliver your order?
          </p>

          <div className="mt-6 space-y-5">
            {/* ADDRESS */}
            <div>
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Address
              </label>

              <textarea
                id="address"
                rows={3}
                value={form.address}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                placeholder="House number, street, area"
                className="w-full resize-none rounded-xl border border-zinc-800 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10"
              />
            </div>

            {/* CITY + PIN */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  City
                </label>

                <input
                  id="city"
                  type="text"
                  value={form.city}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  placeholder="Your city"
                  className="h-11 w-full rounded-xl border border-zinc-800 bg-black/40 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="pincode"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  PIN Code
                </label>

                <input
                  id="pincode"
                  type="text"
                  inputMode="numeric"
                  placeholder="517001"
                  className="h-11 w-full rounded-xl border border-zinc-800 bg-black/40 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10"
                  value={form.pincode}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      pincode: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {/* LANDMARK */}
            <div>
              <label
                htmlFor="landmark"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Landmark
                <span className="ml-2 text-xs text-zinc-600">Optional</span>
              </label>

              <input
                id="landmark"
                type="text"
                placeholder="Near..."
                value={form.landmark}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    landmark: e.target.value,
                  }))
                }
                className="h-11 w-full rounded-xl border border-zinc-800 bg-black/40 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryAddress;
