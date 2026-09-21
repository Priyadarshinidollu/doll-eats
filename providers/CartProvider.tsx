"use client";
import React, { createContext, useEffect, useRef, useState } from "react";
import { useSession } from "@/lib/auth/client";

export type CartItem = {
  id: string;
  quantity: number;
};

const CART_STORAGE_KEY = "doll-eats-cart";

function readLocalCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistLocalCart(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export const CartContext = createContext<{
  cart: CartItem[];
  isCartLoading: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
} | null>(null);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  // True until we know the real cart: either "definitely anonymous" (local
  // storage, available immediately) or "logged in, server fetch done". A
  // logged-in user's cart lives on the server and only arrives after an
  // async round trip, so anything that acts on `cart` (like checkout) must
  // wait for this instead of assuming an empty initial array is final.
  const [isCartLoading, setIsCartLoading] = useState(true);
  const hasSyncedRef = useRef(false);
  const hadUserRef = useRef(false);

  // Anonymous users: load whatever was saved locally on first mount. This must
  // run post-mount rather than via a useState lazy initializer - the server
  // has no localStorage, so SSR always renders an empty cart, and reading it
  // any earlier than an effect would produce a hydration mismatch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(readLocalCart());
  }, []);

  // Once the session resolves, either the anonymous cart (already loaded
  // above) is final, or a logged-in user's cart needs merging with and then
  // loading from the server before it can be considered ready.
  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsCartLoading(false);
      return;
    }

    if (hasSyncedRef.current) return;
    hasSyncedRef.current = true;
    setIsCartLoading(true);

    (async () => {
      const localCart = readLocalCart();

      for (const item of localCart) {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: item.id, quantityDelta: item.quantity }),
        }).catch(() => {});
      }

      try {
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch {
        // ignore
      }

      try {
        const res = await fetch("/api/cart");
        if (res.ok) {
          const data = await res.json();
          setCart(data.items ?? []);
        }
      } catch {
        // ignore
      } finally {
        setIsCartLoading(false);
      }
    })();
  }, [isPending, session?.user]);

  // Detect logout and drop the previous account's cart from memory so it
  // doesn't leak into the next anonymous session on a shared browser.
  useEffect(() => {
    const hasUser = Boolean(session?.user);
    if (hadUserRef.current && !hasUser) {
      setCart([]);
      hasSyncedRef.current = false;
    }
    hadUserRef.current = hasUser;
  }, [session?.user]);

  const syncDelta = (id: string, quantityDelta: number) => {
    if (!session?.user) return;
    fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, quantityDelta }),
    }).catch((error) => console.error("Failed to sync cart", error));
  };

  const syncRemove = (id: string) => {
    if (!session?.user) return;
    fetch(`/api/cart?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    }).catch((error) => console.error("Failed to sync cart", error));
  };

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    const next = existingItem
      ? cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem,
        )
      : [...cart, item];

    setCart(next);
    if (!session?.user) persistLocalCart(next);
    syncDelta(item.id, item.quantity);
  };

  const removeFromCart = (itemId: string) => {
    const next = cart.filter((cartItem) => cartItem.id !== itemId);

    setCart(next);
    if (!session?.user) persistLocalCart(next);
    syncRemove(itemId);
  };

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    const next = cart.map((cartItem) =>
      cartItem.id === itemId
        ? { ...cartItem, quantity: cartItem.quantity + quantity }
        : cartItem,
    );

    setCart(next);
    if (!session?.user) persistLocalCart(next);
    syncDelta(itemId, quantity);
  };

  const clearCart = () => {
    setCart([]);
    if (session?.user) {
      fetch("/api/cart", { method: "DELETE" }).catch((error) =>
        console.error("Failed to clear cart", error),
      );
    } else {
      persistLocalCart([]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartLoading,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
