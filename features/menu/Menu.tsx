"use client";

import React from "react";
import MenuCard from "./MenuCard";
import menuItems, { MenuItem } from "../../data/menu";
import MenuHeader from "./MenuHeader";

export type TSortBy = keyof Pick<
  MenuItem,
  "price" | "rating" | "prepTime" | "calories"
>;

export type TFilterBy = "all" | "veg" | "non-veg";

const Menu = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = React.useState<TSortBy>("price");
  const [filterBy, setFilterBy] = React.useState<TFilterBy>("all");

  const currentMenuItems = () => {
    const searchedItems = menuItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const filteredItems = searchedItems.filter((item) => {
      switch (filterBy) {
        case "veg":
          return item.isVeg;

        case "non-veg":
          return !item.isVeg;

        default:
          return true;
      }
    });

    return [...filteredItems].sort((a, b) => {
      const comparison = a[sortBy] - b[sortBy];

      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  const items = currentMenuItems();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a] px-4 py-12 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl">
        {/* ================= HEADER ================= */}
        <div className="mb-10">
          {/* Small label */}
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-8 bg-amber-500" />

            <span className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400">
              Fresh & Authentic
            </span>

            <div className="h-px w-8 bg-amber-500" />
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Our <span className="text-amber-400">Menu</span>
          </h1>

          {/* Description */}
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Discover a variety of delicious dishes, crafted with fresh
            ingredients and authentic Indian flavors.
          </p>
        </div>

        {/* ================= FILTER / SEARCH ================= */}
        <div className="mb-8 rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-3 shadow-xl backdrop-blur-sm sm:p-4">
          <MenuHeader
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            sortBy={sortBy}
            setSortBy={setSortBy}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
          />
        </div>

        {/* ================= RESULT INFO ================= */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            Showing{" "}
            <span className="font-medium text-zinc-300">{items.length}</span>{" "}
            {items.length === 1 ? "dish" : "dishes"}
          </p>

          {filterBy !== "all" && (
            <span className="rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-xs text-amber-400">
              {filterBy === "veg" ? "Vegetarian" : "Non-Vegetarian"}
            </span>
          )}
        </div>

        {/* ================= MENU GRID ================= */}
        {items.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
            {items.map((item) => (
              <MenuCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          /* ================= EMPTY STATE ================= */
          <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 px-6 text-center">
            <div className="mb-4 text-4xl">🍽️</div>

            <h2 className="text-lg font-semibold text-white">
              No dishes found
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Try changing your search or filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setFilterBy("all");
              }}
              className="mt-5 rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-amber-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
