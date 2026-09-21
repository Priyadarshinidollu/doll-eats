"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth/client";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  amount: number;
  currency: string;
  status: string;
  payment_method: string;
  items: OrderItem[];
  address: string;
  city: string;
  pincode: string;
  landmark: string | null;
  created_at: string;
};

const STATUS_STYLES: Record<string, string> = {
  paid: "border-green-500/30 bg-green-500/10 text-green-400",
  placed: "border-green-500/30 bg-green-500/10 text-green-400",
  created: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  failed: "border-red-500/30 bg-red-500/10 text-red-400",
};

const STATUS_LABELS: Record<string, string> = {
  paid: "Paid",
  placed: "Placed",
  created: "Payment Pending",
  failed: "Payment Failed",
};

const OrderHistoryPage = () => {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = useSession();
  const [orders, setOrders] = React.useState<Order[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!isSessionPending && !session?.user) {
      router.push("/login");
    }
  }, [isSessionPending, session, router]);

  React.useEffect(() => {
    if (!session?.user) return;

    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders ?? []))
      .catch(() => setError("Failed to load your orders."));
  }, [session]);

  if (isSessionPending || !session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-white">
        <p className="text-sm text-zinc-500">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400">
          Account
        </p>

        <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
          Your Orders
        </h1>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          Track and review orders you&apos;ve placed with Doll Eats.
        </p>

        <div className="mt-10 space-y-4">
          {error && <p className="text-sm text-red-400">{error}</p>}

          {orders === null && !error && (
            <p className="text-sm text-zinc-500">Loading your orders...</p>
          )}

          {orders !== null && orders.length === 0 && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
              <p className="text-zinc-400">You haven&apos;t placed any orders yet.</p>
            </div>
          )}

          {orders?.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-sm font-semibold text-amber-400">
                    #DE-{order.id}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${
                    STATUS_STYLES[order.status] ??
                    "border-zinc-700 bg-zinc-900 text-zinc-300"
                  }`}
                >
                  {STATUS_LABELS[order.status] ?? order.status}
                </span>
              </div>

              <div className="mt-4 space-y-1 border-t border-zinc-800 pt-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-zinc-300"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-4">
                <span className="text-sm text-zinc-500">
                  {order.payment_method.toUpperCase()} · {order.city}
                </span>

                <span className="text-lg font-bold text-amber-400">
                  ₹{(order.amount / 100).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default OrderHistoryPage;
