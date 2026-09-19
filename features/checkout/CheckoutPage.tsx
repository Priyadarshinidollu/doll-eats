"use client";

import React from "react";
import { useCart } from "@/features/header/hooks/useCart";
import { CheckoutForm } from "./type/CheckoutFormType";
import CustomerDetails from "./CustomerDetails";
import DeliveryAddress from "./DeliveryAddress";
import PaymentMethod from "./PaymentMethod";

const CheckoutPage = () => {
  const [orderPlaced, setOrderPlaced] = React.useState(false);

  const [form, setForm] = React.useState<CheckoutForm>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    landmark: "",
    paymentMethod: "cod",
  });
  const { cart } = useCart();

  const validateForm = () => {
    if (!form.name.trim()) {
      return "Please enter your name.";
    }

    if (!form.phone.trim()) {
      return "Please enter your phone number.";
    }

    if (!form.email.trim()) {
      return "Please enter your email address.";
    }

    if (!form.address.trim()) {
      return "Please enter your delivery address.";
    }

    if (!form.city.trim()) {
      return "Please enter your city.";
    }

    if (!form.pincode.trim()) {
      return "Please enter your PIN code.";
    }

    return null;
  };
  const handlePlaceOrder = () => {
    const error = validateForm();

    if (error) {
      alert(error);
      return;
    }

    // Temporary: simulate successful order placement
    setOrderPlaced(true);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400">
            Checkout
          </p>

          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            Complete Your Order
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
            Enter your details, choose your delivery option, and complete your
            order.
          </p>
        </div>

        {/* CONTENT */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* LEFT */}
          <div className="space-y-6">
            <CustomerDetails form={form} setForm={setForm} />
            <DeliveryAddress form={form} setForm={setForm} />
            <PaymentMethod form={form} setForm={setForm} />
          </div>

          {/* RIGHT */}
          <div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-white">Your Order</h2>

              <p className="mt-1 text-sm text-zinc-500">
                {cart.length} {cart.length === 1 ? "product" : "products"}
              </p>

              {orderPlaced === false && (
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-amber-400 font-semibold text-black transition hover:bg-amber-300 active:scale-[0.98]"
                >
                  Place Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {orderPlaced && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-center shadow-2xl">
            {/* Success Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10">
              <span className="text-4xl text-green-400">✓</span>
            </div>

            {/* Message */}
            <h2 className="mt-6 font-serif text-3xl font-bold text-white">
              Order Successfully Placed!
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Thank you for ordering with Doll Eats. Your delicious food is
              being prepared.
            </p>

            {/* Order Number */}
            <div className="mt-6 rounded-xl border border-zinc-800 bg-black/30 px-4 py-3">
              <p className="text-xs uppercase tracking-wider text-zinc-600">
                Order Number
              </p>

              <p className="mt-1 font-mono text-sm font-semibold text-amber-400">
                #DE-{Math.floor(100000 + Math.random() * 900000)}
              </p>
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={() => setOrderPlaced(false)}
              className="mt-6 h-11 w-full rounded-full bg-amber-400 font-semibold text-black transition hover:bg-amber-300 active:scale-[0.98]"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default CheckoutPage;
