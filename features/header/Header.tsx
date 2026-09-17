import React from "react";
import SearchBar from "../search/SearchBar";
import Cart from "../cart/Cart";

const Header = () => {
  return (
    <header>
      <h1>Doll Eats</h1>
      <SearchBar />
      <Cart />
    </header>
  );
};

export default Header;
