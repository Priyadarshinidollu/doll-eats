"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth/client";
import { useMenu } from "@/features/menu/hooks/useMenu";
import type { MenuItem } from "@/data/menu";

type FormState = {
  name: string;
  category: string;
  cuisine: string;
  price: string;
  originalPrice: string;
  image: string;
  isVeg: boolean;
  available: boolean;
  bestseller: boolean;
  spicyLevel: string;
  prepTime: string;
  calories: string;
  tags: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  category: "",
  cuisine: "",
  price: "",
  originalPrice: "",
  image: "",
  isVeg: true,
  available: true,
  bestseller: false,
  spicyLevel: "0",
  prepTime: "0",
  calories: "0",
  tags: "",
};

function itemToForm(item: MenuItem): FormState {
  return {
    name: item.name,
    category: item.category,
    cuisine: item.cuisine,
    price: String(item.price),
    originalPrice: String(item.originalPrice),
    image: item.image,
    isVeg: item.isVeg,
    available: item.available,
    bestseller: item.bestseller,
    spicyLevel: String(item.spicyLevel),
    prepTime: String(item.prepTime),
    calories: String(item.calories),
    tags: item.tags.join(", "),
  };
}

function formToPayload(form: FormState) {
  return {
    name: form.name,
    category: form.category,
    cuisine: form.cuisine,
    price: Number(form.price),
    originalPrice: Number(form.originalPrice || form.price),
    image: form.image,
    isVeg: form.isVeg,
    available: form.available,
    bestseller: form.bestseller,
    spicyLevel: Number(form.spicyLevel) || 0,
    prepTime: Number(form.prepTime) || 0,
    calories: Number(form.calories) || 0,
    tags: form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  };
}

const inputClass =
  "h-10 w-full rounded-lg border border-zinc-800 bg-black/40 px-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10";

const AdminMenuPage = () => {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = useSession();
  const { menuItems, isMenuLoading, refreshMenu } = useMenu();

  const [form, setForm] = React.useState<FormState>(EMPTY_FORM);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (isSessionPending) return;
    if (!session?.user || session.user.role !== "admin") {
      router.push("/");
    }
  }, [isSessionPending, session, router]);

  const startEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setForm(itemToForm(item));
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.category.trim() || !form.cuisine.trim() || !form.image.trim()) {
      setError("Name, category, cuisine and image are required.");
      return;
    }

    if (!form.price || Number.isNaN(Number(form.price))) {
      setError("Enter a valid price.");
      return;
    }

    setIsSaving(true);

    try {
      const payload = formToPayload(form);
      const res = await fetch(
        editingId ? `/api/admin/menu/${editingId}` : "/api/admin/menu",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error ?? "Failed to save menu item");
      }

      refreshMenu();
      cancelEdit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this menu item? This cannot be undone.")) return;

    try {
      const res = await fetch(`/api/admin/menu/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to delete menu item");
      }
      refreshMenu();
      if (editingId === id) cancelEdit();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const toggleField = async (
    item: MenuItem,
    field: "available" | "bestseller",
  ) => {
    try {
      const res = await fetch(`/api/admin/menu/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !item[field] }),
      });
      if (!res.ok) throw new Error("Failed to update");
      refreshMenu();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (isSessionPending || !session?.user || session.user.role !== "admin") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-white">
        <p className="text-sm text-zinc-500">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400">
          Admin
        </p>

        <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
          Manage Menu
        </h1>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          Add, edit, or remove dishes from the menu customers see.
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
        >
          <h2 className="text-lg font-semibold text-white">
            {editingId ? "Edit Item" : "Add New Item"}
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Name
              </label>
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Category
              </label>
              <input
                className={inputClass}
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Cuisine
              </label>
              <input
                className={inputClass}
                value={form.cuisine}
                onChange={(e) =>
                  setForm((f) => ({ ...f, cuisine: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Image URL
              </label>
              <input
                className={inputClass}
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Price (₹)
              </label>
              <input
                type="number"
                className={inputClass}
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Original Price (₹)
              </label>
              <input
                type="number"
                className={inputClass}
                value={form.originalPrice}
                onChange={(e) =>
                  setForm((f) => ({ ...f, originalPrice: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Prep Time (min)
              </label>
              <input
                type="number"
                className={inputClass}
                value={form.prepTime}
                onChange={(e) =>
                  setForm((f) => ({ ...f, prepTime: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Calories
              </label>
              <input
                type="number"
                className={inputClass}
                value={form.calories}
                onChange={(e) =>
                  setForm((f) => ({ ...f, calories: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Spicy Level (0-3)
              </label>
              <input
                type="number"
                min={0}
                max={3}
                className={inputClass}
                value={form.spicyLevel}
                onChange={(e) =>
                  setForm((f) => ({ ...f, spicyLevel: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                Tags (comma separated)
              </label>
              <input
                className={inputClass}
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={form.isVeg}
                onChange={(e) =>
                  setForm((f) => ({ ...f, isVeg: e.target.checked }))
                }
              />
              Vegetarian
            </label>

            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={form.available}
                onChange={(e) =>
                  setForm((f) => ({ ...f, available: e.target.checked }))
                }
              />
              Available
            </label>

            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={form.bestseller}
                onChange={(e) =>
                  setForm((f) => ({ ...f, bestseller: e.target.checked }))
                }
              />
              Bestseller
            </label>
          </div>

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="h-11 rounded-full bg-amber-400 px-6 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving..." : editingId ? "Save Changes" : "Add Item"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="h-11 rounded-full border border-zinc-800 px-6 text-sm text-zinc-300 transition hover:border-zinc-700"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* LIST */}
        <div className="mt-10 space-y-3">
          {isMenuLoading && (
            <p className="text-sm text-zinc-500">Loading menu...</p>
          )}

          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-zinc-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">{item.name}</p>
                <p className="text-xs text-zinc-500">
                  {item.category} · ₹{item.price}
                </p>
              </div>

              <label className="flex items-center gap-2 text-xs text-zinc-400">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => toggleField(item, "available")}
                />
                Available
              </label>

              <label className="flex items-center gap-2 text-xs text-zinc-400">
                <input
                  type="checkbox"
                  checked={item.bestseller}
                  onChange={() => toggleField(item, "bestseller")}
                />
                Bestseller
              </label>

              <button
                type="button"
                onClick={() => startEdit(item)}
                className="h-9 rounded-full border border-zinc-800 px-4 text-xs text-zinc-300 transition hover:border-amber-500/50 hover:text-amber-400"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="h-9 rounded-full border border-red-500/30 px-4 text-xs text-red-400 transition hover:border-red-400 hover:bg-red-500/10"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AdminMenuPage;
