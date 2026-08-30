import type { Category, CategorySlug } from "@/types";
import { unsplash, IMG } from "./images";
import { products } from "./products";

const baseCategories: Omit<Category, "productCount">[] = [
  { slug: "mobl-rahati", title: "مبل راحتی", image: unsplash(IMG.sofaCozy, 640) },
  { slug: "mobl-tak", title: "مبل تک", image: unsplash(IMG.armchair, 640) },
  { slug: "mobl-tak-rahati", title: "مبل تک راحتی", image: unsplash(IMG.sofaGray, 640) },
  { slug: "mobl-l", title: "مبل ال", image: unsplash(IMG.sofaWide, 640) },
  { slug: "miz-nahar-khori", title: "میز ناهارخوری", image: unsplash(IMG.diningTable, 640) },
];

export const categories: Category[] = baseCategories.map((c) => ({
  ...c,
  productCount: products.filter((p) => p.category === c.slug).length,
}));

export function getCategoryTitle(slug: CategorySlug): string {
  return categories.find((c) => c.slug === slug)?.title ?? slug;
}
