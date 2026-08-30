import type { CategorySlug, Product } from "@/types";

export type PriceBucket = "under-15" | "15-40" | "40-80" | "over-80";

export const priceBuckets: { id: PriceBucket; label: string; test: (price: number) => boolean }[] = [
  { id: "under-15", label: "زیر ۱۵ میلیون تومان", test: (p) => p < 15_000_000 },
  { id: "15-40", label: "۱۵ تا ۴۰ میلیون تومان", test: (p) => p >= 15_000_000 && p < 40_000_000 },
  { id: "40-80", label: "۴۰ تا ۸۰ میلیون تومان", test: (p) => p >= 40_000_000 && p < 80_000_000 },
  { id: "over-80", label: "بالای ۸۰ میلیون تومان", test: (p) => p >= 80_000_000 },
];

export type SortOption = "newest" | "cheapest" | "expensive" | "bestseller";

export const sortOptions: { id: SortOption; label: string }[] = [
  { id: "bestseller", label: "پرفروش‌ترین" },
  { id: "newest", label: "جدیدترین" },
  { id: "cheapest", label: "ارزان‌ترین" },
  { id: "expensive", label: "گران‌ترین" },
];

export interface ShopFilters {
  categories: CategorySlug[];
  priceBucket: PriceBucket | null;
  colors: string[];
  inStockOnly: boolean;
}

export const emptyFilters: ShopFilters = {
  categories: [],
  priceBucket: null,
  colors: [],
  inStockOnly: false,
};

export function applyFilters(products: Product[], filters: ShopFilters, query: string): Product[] {
  const q = query.trim();
  return products.filter((p) => {
    if (q && !p.title.includes(q)) return false;
    if (filters.categories.length && !filters.categories.includes(p.category)) return false;
    if (filters.inStockOnly && !p.inStock) return false;
    if (filters.colors.length && !(p.colors ?? []).some((c) => filters.colors.includes(c.name)))
      return false;
    if (filters.priceBucket) {
      const bucket = priceBuckets.find((b) => b.id === filters.priceBucket);
      if (bucket && !bucket.test(p.price)) return false;
    }
    return true;
  });
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const list = [...products];
  switch (sort) {
    case "cheapest":
      return list.sort((a, b) => a.price - b.price);
    case "expensive":
      return list.sort((a, b) => b.price - a.price);
    case "newest":
      return list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    case "bestseller":
    default:
      return list.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
  }
}
