const menuItems: MenuItem[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Butter Chicken",
    category: "Main Course",
    cuisine: "North Indian",
    price: 299,
    originalPrice: 349,
    rating: 4.8,
    reviewCount: 342,
    isVeg: false,
    spicyLevel: 2,
    prepTime: 25,
    calories: 480,
    available: true,
    bestseller: true,
    tags: ["Chicken", "Creamy", "Mughlai"],
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Masala Dosa",
    category: "South Indian",
    cuisine: "South Indian",
    price: 129,
    originalPrice: 149,
    rating: 4.7,
    reviewCount: 521,
    isVeg: true,
    spicyLevel: 1,
    prepTime: 15,
    calories: 320,
    available: true,
    bestseller: true,
    tags: ["Dosa", "Potato", "Breakfast"],
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Paneer Tikka",
    category: "Starters",
    cuisine: "North Indian",
    price: 199,
    originalPrice: 229,
    rating: 4.6,
    reviewCount: 287,
    isVeg: true,
    spicyLevel: 2,
    prepTime: 20,
    calories: 350,
    available: true,
    bestseller: false,
    tags: ["Paneer", "Grilled", "Tandoor"],
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Samosa",
    category: "Snacks",
    cuisine: "Indian",
    price: 60,
    originalPrice: 70,
    rating: 4.5,
    reviewCount: 412,
    isVeg: true,
    spicyLevel: 2,
    prepTime: 10,
    calories: 260,
    available: true,
    bestseller: true,
    tags: ["Potato", "Snack", "Crispy"],
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "Chole Bhature",
    category: "Main Course",
    cuisine: "North Indian",
    price: 159,
    originalPrice: 189,
    rating: 4.6,
    reviewCount: 356,
    isVeg: true,
    spicyLevel: 3,
    prepTime: 20,
    calories: 620,
    available: true,
    bestseller: true,
    tags: ["Chickpeas", "Bhatura", "Punjabi"],
    image:
      "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    name: "Tandoori Chicken",
    category: "Starters",
    cuisine: "North Indian",
    price: 279,
    originalPrice: 319,
    rating: 4.9,
    reviewCount: 618,
    isVeg: false,
    spicyLevel: 3,
    prepTime: 30,
    calories: 420,
    available: true,
    bestseller: true,
    tags: ["Chicken", "Tandoor", "Grilled", "Protein"],
    image:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    name: "Idli Sambar",
    category: "South Indian",
    cuisine: "South Indian",
    price: 99,
    originalPrice: 119,
    rating: 4.4,
    reviewCount: 245,
    isVeg: true,
    spicyLevel: 1,
    prepTime: 12,
    calories: 280,
    available: true,
    bestseller: false,
    tags: ["Idli", "Sambar", "Breakfast"],
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    name: "Pav Bhaji",
    category: "Street Food",
    cuisine: "Indian",
    price: 119,
    originalPrice: 139,
    rating: 4.5,
    reviewCount: 318,
    isVeg: true,
    spicyLevel: 2,
    prepTime: 15,
    calories: 410,
    available: true,
    bestseller: false,
    tags: ["Pav", "Vegetables", "Mumbai"],
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    name: "Fried Chicken",
    category: "Main Course",
    cuisine: "Indian",
    price: 99,
    originalPrice: 119,
    rating: 4.8,
    reviewCount: 189,
    isVeg: false,
    spicyLevel: 3,
    prepTime: 15,
    calories: 220,
    available: true,
    bestseller: false,
    tags: ["chicken"],
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
  },
] as const;

export type MenuItem = {
  id: string;
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

export default menuItems;
