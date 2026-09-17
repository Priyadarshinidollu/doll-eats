import { MenuItem } from "@/data/menu";
import React from "react";
import Image from "next/image";
const MenuCard: React.FC<MenuItem> = ({
  name,
  price,
  image,
  rating,
  available,
  isVeg,
}) => {
  return (
    <div className="relative border rounded-lg p-4">
      {/* ABSOLUTE */}
      <div className="absolute z-10 top-7 right-6 ">
        {available ? (
          <div className="h-2 w-2 bg-green-500 shadow-lg rounded-full"></div>
        ) : (
          <div className="h-2 w-2 bg-red-500 shadow-lg rounded-full"></div>
        )}
      </div>

      <div className="relative w-40 h-40 mb-2">
        <Image
          src={image}
          fill
          className=" rounded-lg object-cover"
          alt={name}
        />
      </div>

      {/* ABSOLUTE */}
      <div className="absolute right-6 bottom-22 border h-5 w-5 flex items-center justify-center">
        {isVeg ? (
          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
        ) : (
          <div className="h-2 w-2 bg-red-500 rounded-full"></div>
        )}
      </div>

      <h3>{name}</h3>

      <div className="flex justify-between">
        <p>₹{price}</p>
        <p>Rating: {rating}</p>
      </div>
    </div>
  );
};

export default MenuCard;
