"use client";
import React, { createContext, useEffect, useState } from "react";
import type { MenuItem } from "@/data/menu";

export const MenuContext = createContext<{
  menuItems: MenuItem[];
  isMenuLoading: boolean;
  refreshMenu: () => void;
} | null>(null);

const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isMenuLoading, setIsMenuLoading] = useState(true);

  const load = () => {
    setIsMenuLoading(true);
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data.items ?? []))
      .catch((error) => console.error("Failed to load menu", error))
      .finally(() => setIsMenuLoading(false));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  return (
    <MenuContext.Provider
      value={{ menuItems, isMenuLoading, refreshMenu: load }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
