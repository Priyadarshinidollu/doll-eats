// One-time seed: run with `npx tsx lib/db/seed-menu.ts` after applying schema.sql.
// Populates menu_items from the original static data/menu.ts, preserving ids
// so existing cart_items/orders rows (which reference those ids) stay valid.
//
// tsx doesn't load .env the way `next dev`/`next build` do, so load it here.
import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { query } from "@/lib/db";
import menuItems from "@/data/menu";

async function main() {
  for (const item of menuItems) {
    await query(
      `INSERT INTO menu_items (
        id, name, category, cuisine, price, original_price, rating, review_count,
        is_veg, spicy_level, prep_time, calories, available, bestseller, tags, image
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
      ON CONFLICT (id) DO NOTHING`,
      [
        item.id,
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
  }

  console.log(`Seeded ${menuItems.length} menu items.`);
  process.exit(0);
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
