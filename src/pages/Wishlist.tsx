import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import EmptyState from "@/components/ui/EmptyState";

export default function Wishlist() {
  const productIds = useWishlistStore((s) => s.productIds);
  const saved = products.filter((p) => productIds.includes(p.id));

  return (
    <>
      <title>علاقه‌مندی‌ها | مبلمان جهان‌نما</title>

      <div className="container-page py-8 md:py-12">
        <h1 className="mb-8 text-2xl font-bold text-ink md:text-3xl">علاقه‌مندی‌ها</h1>

        {saved.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="لیست علاقه‌مندی‌ها خالی است"
            description="محصولات مورد علاقه خود را با ضربه روی آیکون قلب ذخیره کنید."
            actionLabel="مشاهده فروشگاه"
            actionTo="/shop"
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {saved.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
