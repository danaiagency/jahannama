import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";
import { products } from "@/data/products";

function sameLine(i: CartItem, productId: string, colorName: string, woodMaterial: string) {
  return i.productId === productId && i.colorName === colorName && i.woodMaterial === woodMaterial;
}

interface CartState {
  items: CartItem[];
  addItem: (productId: string, colorName: string, woodMaterial: string, quantity?: number) => void;
  removeItem: (productId: string, colorName: string, woodMaterial: string) => void;
  increment: (productId: string, colorName: string, woodMaterial: string) => void;
  decrement: (productId: string, colorName: string, woodMaterial: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (productId, colorName, woodMaterial, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => sameLine(i, productId, colorName, woodMaterial));
          if (existing) {
            return {
              items: state.items.map((i) =>
                sameLine(i, productId, colorName, woodMaterial)
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, { productId, colorName, woodMaterial, quantity }] };
        }),
      removeItem: (productId, colorName, woodMaterial) =>
        set((state) => ({
          items: state.items.filter((i) => !sameLine(i, productId, colorName, woodMaterial)),
        })),
      increment: (productId, colorName, woodMaterial) =>
        set((state) => ({
          items: state.items.map((i) =>
            sameLine(i, productId, colorName, woodMaterial) ? { ...i, quantity: i.quantity + 1 } : i
          ),
        })),
      decrement: (productId, colorName, woodMaterial) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              sameLine(i, productId, colorName, woodMaterial) ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "jahannama-cart" }
  )
);

export function useCartTotals() {
  const items = useCartStore((s) => s.items);
  let subtotal = 0;
  let count = 0;
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;
    subtotal += product.price * item.quantity;
    count += item.quantity;
  }
  return { subtotal, count };
}
