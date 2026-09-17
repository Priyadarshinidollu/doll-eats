import React from "react";
import { TSortBy } from "./Menu";

const MenuHeader = ({
  sortOrder,
  setSortOrder,
  sortBy,
  setSortBy,
  searchTerm,
  setSearchTerm,
  filterBy,
  setFilterBy,
}: {
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  sortBy: TSortBy;
  setSortBy: (sort: TSortBy) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterBy: "all" | "veg" | "non-veg";
  setFilterBy: (filter: "all" | "veg" | "non-veg") => void;
}) => {
  return (
    <div className="mb-6 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="min-w-0 flex-1">
        <input
          type="text"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            h-11 w-full rounded-xl
            border border-zinc-800
            bg-zinc-950
            px-4 text-sm text-white
            placeholder:text-zinc-500
            outline-none
            transition
            focus:border-amber-500/60
            focus:ring-2 focus:ring-amber-500/10
          "
        />
      </div>

      {/* Controls */}
      <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
        {/* Sort By */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as TSortBy)}
          className="
            h-11 shrink-0 rounded-xl
            border border-zinc-800
            bg-zinc-950
            px-3
            text-sm text-zinc-200
            outline-none
            transition
            hover:border-zinc-700
            focus:border-amber-500/60
            focus:ring-2 focus:ring-amber-500/10
          "
        >
          <option value="price">Sort by: Price</option>
          <option value="rating">Sort by: Rating</option>
          <option value="prepTime">Sort by: Prep Time</option>
          <option value="calories">Sort by: Calories</option>
        </select>

        {/* Sort Order */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="
            h-11 shrink-0 rounded-xl
            border border-zinc-800
            bg-zinc-950
            px-3
            text-sm text-zinc-200
            outline-none
            transition
            hover:border-zinc-700
            focus:border-amber-500/60
            focus:ring-2 focus:ring-amber-500/10
          "
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        {/* Filter */}
        <select
          value={filterBy}
          onChange={(e) =>
            setFilterBy(e.target.value as "all" | "veg" | "non-veg")
          }
          className="
            h-11 shrink-0 rounded-xl
            border border-zinc-800
            bg-zinc-950
            px-3
            text-sm text-zinc-200
            outline-none
            transition
            hover:border-zinc-700
            focus:border-amber-500/60
            focus:ring-2 focus:ring-amber-500/10
          "
        >
          <option value="all">Filter: All</option>
          <option value="veg">Filter: Veg</option>
          <option value="non-veg">Filter: Non-Veg</option>
        </select>
      </div>
    </div>
  );
};

export default MenuHeader;
