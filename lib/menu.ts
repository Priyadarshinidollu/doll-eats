import { query } from "@/lib/db";
import type { MenuItem } from "@/data/menu";

type MenuItemRow = {
  id: string;
  name: string;
  category: string;
  cuisine: string;
  price: number;
  original_price: number;
  rating: number;
  review_count: number;
  is_veg: boolean;
  spicy_level: number;
  prep_time: number;
  calories: number;
  available: boolean;
  bestseller: boolean;
  tags: string[];
  image: string;
};

function rowToMenuItem(row: MenuItemRow): MenuItem {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    cuisine: row.cuisine,
    price: row.price,
    originalPrice: row.original_price,
    rating: row.rating,
    reviewCount: row.review_count,
    isVeg: row.is_veg,
    spicyLevel: row.spicy_level,
    prepTime: row.prep_time,
    calories: row.calories,
    available: row.available,
    bestseller: row.bestseller,
    tags: row.tags,
    image: row.image,
  };
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const result = await query<MenuItemRow>(
    `SELECT * FROM menu_items ORDER BY name`,
  );
  return result.rows.map(rowToMenuItem);
}

export async function getMenuItemById(id: string): Promise<MenuItem | null> {
  const result = await query<MenuItemRow>(
    `SELECT * FROM menu_items WHERE id = $1`,
    [id],
  );
  return result.rows[0] ? rowToMenuItem(result.rows[0]) : null;
}
