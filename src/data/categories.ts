import type { Category, CategorySlug } from "@/types";
import { categoryImage } from "./images";
import { products } from "./products";

const baseCategories: Omit<Category, "productCount">[] = [
  { slug: "mobl-rahati", title: "مبل راحتی", image: categoryImage("mobl-rahati") },
  { slug: "mobl-tak", title: "مبل تک", image: categoryImage("mobl-tak") },
  { slug: "mobl-tak-rahati", title: "مبل تک راحتی", image: categoryImage("mobl-tak-rahati") },
  { slug: "mobl-l", title: "مبل ال", image: categoryImage("mobl-l") },
  { slug: "miz-nahar-khori", title: "میز ناهارخوری", image: categoryImage("miz-nahar-khori") },
];

export const categories: Category[] = baseCategories.map((c) => ({
  ...c,
  productCount: products.filter((p) => p.category === c.slug).length,
}));

export function getCategoryTitle(slug: CategorySlug): string {
  return categories.find((c) => c.slug === slug)?.title ?? slug;
}
