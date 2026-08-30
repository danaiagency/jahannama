import { Link } from "react-router-dom";
import type { Category } from "@/types";
import { toPersianDigits } from "@/utils/format";
import LazyImage from "@/components/ui/LazyImage";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className="group relative block overflow-hidden rounded-2xl focus-visible:outline-none"
    >
      <LazyImage
        src={category.image}
        alt={category.title}
        ratio="aspect-[3/4]"
        className="transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="text-base font-semibold text-white">{category.title}</h3>
        <p className="mt-0.5 text-xs text-white/75">
          {toPersianDigits(category.productCount)} محصول
        </p>
      </div>
    </Link>
  );
}
