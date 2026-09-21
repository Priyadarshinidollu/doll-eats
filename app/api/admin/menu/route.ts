import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { requireAdminSession } from "@/lib/admin";
import { query } from "@/lib/db";
import { getMenuItems } from "@/lib/menu";

type MenuItemInput = {
  name: string;
  category: string;
  cuisine: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  isVeg: boolean;
  spicyLevel: number;
  prepTime: number;
  calories: number;
  available: boolean;
  bestseller: boolean;
  tags: string[];
  image: string;
};

function parseMenuItemInput(input: unknown): MenuItemInput | null {
  if (typeof input !== "object" || input === null) return null;
  const b = input as Record<string, unknown>;

  if (
    typeof b.name !== "string" ||
    !b.name.trim() ||
    typeof b.category !== "string" ||
    !b.category.trim() ||
    typeof b.cuisine !== "string" ||
    !b.cuisine.trim() ||
    typeof b.image !== "string" ||
    !b.image.trim() ||
    typeof b.price !== "number" ||
    !Number.isFinite(b.price) ||
    b.price < 0
  ) {
    return null;
  }

  return {
    name: b.name.trim(),
    category: b.category.trim(),
    cuisine: b.cuisine.trim(),
    price: b.price,
    originalPrice:
      typeof b.originalPrice === "number" && Number.isFinite(b.originalPrice)
        ? b.originalPrice
        : b.price,
    rating: typeof b.rating === "number" ? b.rating : 0,
    reviewCount: typeof b.reviewCount === "number" ? b.reviewCount : 0,
    isVeg: typeof b.isVeg === "boolean" ? b.isVeg : true,
    spicyLevel: typeof b.spicyLevel === "number" ? b.spicyLevel : 0,
    prepTime: typeof b.prepTime === "number" ? b.prepTime : 0,
    calories: typeof b.calories === "number" ? b.calories : 0,
    available: typeof b.available === "boolean" ? b.available : true,
    bestseller: typeof b.bestseller === "boolean" ? b.bestseller : false,
    tags: Array.isArray(b.tags) ? b.tags.filter((t) => typeof t === "string") : [],
    image: b.image.trim(),
  };
}

export async function GET() {
  const admin = await requireAdminSession();

  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const items = await getMenuItems();
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdminSession();

  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const item = parseMenuItemInput(body);

  if (!item) {
    return NextResponse.json(
      { error: "Missing or invalid menu item fields" },
      { status: 400 },
    );
  }

  const id = randomUUID();

  await query(
    `INSERT INTO menu_items (
      id, name, category, cuisine, price, original_price, rating, review_count,
      is_veg, spicy_level, prep_time, calories, available, bestseller, tags, image
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`,
    [
      id,
      item.name,
      item.category,
      item.cuisine,
      item.price,
      item.originalPrice,
      item.rating,
      item.reviewCount,
      item.isVeg,
      item.spicyLevel,
      item.prepTime,
      item.calories,
      item.available,
      item.bestseller,
      item.tags,
      item.image,
    ],
  );

  return NextResponse.json({ id }, { status: 201 });
}
