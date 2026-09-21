-- Run this once against PGDATABASE_URL to set up the tables this app needs:
--   psql "$PGDATABASE_URL" -f lib/db/schema.sql
--
-- Identity is Neon Auth's job (see lib/auth/server.ts) - it manages its own
-- user/session/account tables remotely. Everywhere below, user_id is the
-- Neon Auth user id (text), not a foreign key into a local table.

CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT,
  razorpay_order_id TEXT UNIQUE,
  razorpay_payment_id TEXT,
  amount INTEGER NOT NULL, -- paise
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'created', -- created | paid | failed
  payment_method TEXT NOT NULL,
  receipt TEXT,
  items JSONB NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  pincode TEXT NOT NULL,
  landmark TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS orders_razorpay_order_id_idx ON orders (razorpay_order_id);
CREATE INDEX IF NOT EXISTS orders_user_id_idx ON orders (user_id);

CREATE TABLE IF NOT EXISTS cart_items (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  item_id TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, item_id)
);

CREATE INDEX IF NOT EXISTS cart_items_user_id_idx ON cart_items (user_id);

CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  cuisine TEXT NOT NULL,
  price INTEGER NOT NULL, -- rupees
  original_price INTEGER NOT NULL,
  rating REAL NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  is_veg BOOLEAN NOT NULL DEFAULT true,
  spicy_level INTEGER NOT NULL DEFAULT 0,
  prep_time INTEGER NOT NULL DEFAULT 0,
  calories INTEGER NOT NULL DEFAULT 0,
  available BOOLEAN NOT NULL DEFAULT true,
  bestseller BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[] NOT NULL DEFAULT '{}',
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
