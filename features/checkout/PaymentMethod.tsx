"use client";

import React from "react";

type CheckoutForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  landmark: string;
  paymentMethod: "upi" | "card";
};

type CustomerDetailsProps = {
  form: CheckoutForm;
  setForm: React.Dispatch<React.SetStateAction<CheckoutForm>>;
};
const PaymentMethod = ({
  form,
  setForm,
}: {
  form: CheckoutForm;
  setForm: React.Dispatch<React.SetStateAction<CheckoutForm>>;
}) => {
  const methods = [
    {
      id: "upi" as const,
      title: "UPI",
      description: "Pay using your UPI app",
      icon: "📱",
    },
    {
      id: "card" as const,
      title: "Credit / Debit Card",
      description: "Secure card payment",
      icon: "💳",
    },
  ];

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-black">
          3
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white">Payment Method</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Choose how you'd like to pay.
          </p>

          <div className="mt-6 space-y-3">
            {methods.map((method) => {
              const selected = form.paymentMethod === method.id;

              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      paymentMethod: method.id,
                    }))
                  }
                  className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                    selected
                      ? "border-amber-500/50 bg-amber-500/5"
                      : "border-zinc-800 bg-black/20 hover:border-zinc-700"
                  }`}
                >
                  {/* ICON */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-lg">
                    {method.icon}
                  </div>

                  {/* TEXT */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {method.title}
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      {method.description}
                    </p>
                  </div>

                  {/* RADIO */}
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      selected ? "border-amber-400" : "border-zinc-700"
                    }`}
                  >
                    {selected && (
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethod;
