"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";

const SignupPage = () => {
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);

    await authClient.signUp.email(
      { name: name.trim(), email: email.trim(), password },
      {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          setError(ctx.error.message ?? "Failed to create account.");
          setIsSubmitting(false);
        },
      },
    );
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 py-16 text-white">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400">
          Doll Eats
        </p>

        <h1 className="mt-3 font-serif text-3xl font-bold">
          Create an account
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Sign up to place orders and track them.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="h-11 w-full rounded-xl border border-zinc-800 bg-black/40 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-11 w-full rounded-xl border border-zinc-800 bg-black/40 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="h-11 w-full rounded-xl border border-zinc-800 bg-black/40 px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center rounded-full bg-amber-400 font-semibold text-black transition hover:bg-amber-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-amber-400">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignupPage;
