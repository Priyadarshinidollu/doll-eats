"use client";
import React, { createContext, useState } from "react";
export type CartItem = {
  id: string;
  quantity: number;
};
export const CartContext = createContext<{
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
} | null>(null);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem,
        );
      }
      return [...prevCart, item];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== itemId),
    );
  };

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem,
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
