import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { formatToman } from "@/utils/format";
import { useWishlistStore } from "@/store/wishlist";
import { useCartStore } from "@/store/cart";
import { useToastStore } from "@/store/toast";
import Badge from "@/components/ui/Badge";
import LazyImage from "@/components/ui/LazyImage";

export default function ProductCard({ product }: { product: Product }) {
  const isSaved = useWishlistStore((s) => s.isSaved(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useToastStore((s) => s.show);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product.id, product.colors?.[0]?.name ?? "بدون رنگ", product.woodOptions[0], 1);
    showToast("محصول به سبد خرید اضافه شد.");
  }

  function handleToggleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggleWishlist(product.id);
  }

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block focus-visible:outline-none"
      aria-label={product.title}
    >
      <div className="relative">
        <LazyImage
          src={product.images[0]}
          alt={product.title}
          className="rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
        />

        <div className="absolute inset-x-3 top-3 flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            {product.isNew && <Badge tone="gold">جدید</Badge>}
            {product.isBestSeller && <Badge tone="ink">پرفروش</Badge>}
          </div>
          <button
            type="button"
            onClick={handleToggleWishlist}
            aria-label={isSaved ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
            aria-pressed={isSaved}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-soft backdrop-blur transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-gold"
          >
            <Heart
              className="h-4 w-4"
              strokeWidth={1.75}
              fill={isSaved ? "currentColor" : "none"}
              color={isSaved ? "#B5432F" : "currentColor"}
            />
          </button>
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 flex items-end rounded-2xl bg-ink/10">
            <span className="m-3 rounded-full bg-ink/85 px-3 py-1 text-xs text-white">
              ناموجود
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium text-ink">{product.title}</h3>
          <span className="tnum block text-sm font-semibold text-ink">
            {formatToman(product.price)}
          </span>
          <span className="text-[11px] text-ink-faint">قیمت عمده زیره کار</span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          aria-label="افزودن به سبد خرید"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-soft text-ink transition-colors hover:bg-gold hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-surface-soft disabled:hover:text-ink"
        >
          <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
    </Link>
  );
}
