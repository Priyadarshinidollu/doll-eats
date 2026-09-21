"use client";

import React from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useCart } from "@/features/header/hooks/useCart";
import { useSession } from "@/lib/auth/client";
import { CheckoutForm } from "./type/CheckoutFormType";
import CustomerDetails from "./CustomerDetails";
import DeliveryAddress from "./DeliveryAddress";
import PaymentMethod from "./PaymentMethod";
import type {
  RazorpayFailureResponse,
  RazorpaySuccessResponse,
} from "@/types/razorpay";

const CheckoutPage = () => {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = useSession();
  const [orderPlaced, setOrderPlaced] = React.useState(false);
  const [placedOrderId, setPlacedOrderId] = React.useState<string | null>(
    null,
  );
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [paymentError, setPaymentError] = React.useState<string | null>(null);

  const [form, setForm] = React.useState<CheckoutForm>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    landmark: "",
    paymentMethod: "upi",
  });
  const { cart, isCartLoading, clearCart } = useCart();

  // Checkout requires an account so the order can be tied to it.
  React.useEffect(() => {
    if (!isSessionPending && !session?.user) {
      router.push("/login");
    }
  }, [isSessionPending, session, router]);

  // Prefill what we already know from the account, once the session (which
  // loads asynchronously) resolves - there's no earlier point to read it from.
  React.useEffect(() => {
    if (!session?.user) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm((prev) => ({
      ...prev,
      name: prev.name || session.user.name || "",
      email: prev.email || session.user.email || "",
    }));
  }, [session]);

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

  const handlePlaceOrder = async () => {
    const error = validateForm();

    if (error) {
      alert(error);
      return;
    }

    setPaymentError(null);
    setIsProcessing(true);

    try {
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          paymentMethod: form.paymentMethod,
          customer: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
            city: form.city,
            pincode: form.pincode,
            landmark: form.landmark,
          },
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData?.error ?? "Failed to create order");
      }

      const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

      if (!razorpayKeyId || typeof window.Razorpay === "undefined") {
        throw new Error("Payment gateway failed to load. Please try again.");
      }

      const razorpay = new window.Razorpay({
        key: razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Doll Eats",
        description: "Order payment",
        order_id: orderData.order_id,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#fbbf24" },
        handler: async (response: RazorpaySuccessResponse) => {
          try {
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok || !verifyData.success) {
              throw new Error(
                verifyData?.error ?? "Payment verification failed",
              );
            }

            clearCart();
            setPlacedOrderId(verifyData.orderId ?? null);
            setOrderPlaced(true);
          } catch (verifyError) {
            setPaymentError(
              verifyError instanceof Error
                ? verifyError.message
                : "Payment verification failed",
            );
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      });

      razorpay.on("payment.failed", (response: RazorpayFailureResponse) => {
        setPaymentError(
          response.error?.description ?? "Payment failed. Please try again.",
        );
        setIsProcessing(false);
      });

      razorpay.open();
    } catch (err) {
      setPaymentError(
        err instanceof Error ? err.message : "Something went wrong",
      );
      setIsProcessing(false);
    }
  };

  if (isSessionPending || !session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-white">
        <p className="text-sm text-zinc-500">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-12 text-white sm:px-6 lg:px-8">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
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
                {isCartLoading
                  ? "Loading your cart..."
                  : `${cart.length} ${cart.length === 1 ? "product" : "products"}`}
              </p>

              {orderPlaced === false && (
                <>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing || isCartLoading}
                    className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-amber-400 font-semibold text-black transition hover:bg-amber-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isCartLoading
                      ? "Loading cart..."
                      : isProcessing
                        ? "Processing..."
                        : "Place Order"}
                  </button>

                  {paymentError && (
                    <p className="mt-3 text-sm text-red-400">
                      {paymentError}
                    </p>
                  )}
                </>
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
                #DE-{placedOrderId ?? "—"}
              </p>
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={() => {
                setOrderPlaced(false);
                setPlacedOrderId(null);
              }}
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
