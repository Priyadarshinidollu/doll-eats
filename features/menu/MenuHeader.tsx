import React from "react";
import SearchBar from "../search/SearchBar";
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
  //   const [hideSort, sethideSort] = React.useState(false);
  return (
    <div className="mb-4 flex w-full items-center justify-between gap-4">
      {/* Search */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sort By */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as TSortBy)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
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
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
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
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">Filter: All</option>
        <option value="veg">Filter: Veg</option>
        <option value="non-veg">Filter: Non-Veg</option>
      </select>
    </div>
  );
};

export default MenuHeader;
