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
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = React.useState<TSortBy>("price");
  const [filterBy, setFilterBy] = React.useState<TFilterBy>("all");

  const currentMenuItems = () => {
    const searchedItems = menuItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const sortedItems = searchedItems.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    });

    switch (filterBy) {
      case "veg":
        return sortedItems.filter((item) => item.isVeg);
      case "non-veg":
        return sortedItems.filter((item) => !item.isVeg);
      default:
        return sortedItems;
    }
  };

  return (
    <div className="flex w-full  flex-col items-center justify-center p-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentMenuItems().map((item) => (
          <MenuCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
