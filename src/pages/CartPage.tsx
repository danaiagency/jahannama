import { Link } from "react-router-dom";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore, useCartTotals } from "@/store/cart";
import { products } from "@/data/products";
import { formatToman } from "@/utils/format";
import EmptyState from "@/components/ui/EmptyState";
import LazyImage from "@/components/ui/LazyImage";
import QuantityStepper from "@/components/product/QuantityStepper";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const removeItem = useCartStore((s) => s.removeItem);
  const { subtotal, count } = useCartTotals();

  const lines = items
    .map((item) => ({ item, product: products.find((p) => p.id === item.productId) }))
    .filter((l) => l.product);

  return (
    <>
      <title>سبد خرید | مبلمان جهان‌نما</title>

      <div className="container-page py-8 md:py-12">
        <h1 className="mb-8 text-2xl font-bold text-ink md:text-3xl">سبد خرید</h1>

        {lines.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="سبد خرید شما خالی است"
            description="هنوز محصولی به سبد خرید اضافه نکرده‌اید. سری به فروشگاه بزنید."
            actionLabel="مشاهده فروشگاه"
            actionTo="/shop"
          />
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
            <ul className="flex flex-col divide-y divide-border">
              {lines.map(({ item, product }) => {
                if (!product) return null;
                return (
                  <li key={product.id + item.colorName + item.woodMaterial} className="flex gap-4 py-5">
                    <Link to={`/product/${product.slug}`} className="shrink-0">
                      <LazyImage
                        src={product.images[0]}
                        alt={product.title}
                        ratio="aspect-square"
                        className="w-24 rounded-xl sm:w-28"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            to={`/product/${product.slug}`}
                            className="text-sm font-medium text-ink hover:text-gold-dark"
                          >
                            {product.title}
                          </Link>
                          <p className="mt-1 text-xs text-ink-soft">
                            رنگ: {item.colorName} · جنس چوب: {item.woodMaterial}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(product.id, item.colorName, item.woodMaterial)}
                          aria-label="حذف از سبد خرید"
                          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-red-tint hover:text-red"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(next) =>
                            next > item.quantity
                              ? increment(product.id, item.colorName, item.woodMaterial)
                              : decrement(product.id, item.colorName, item.woodMaterial)
                          }
                        />
                        <span className="tnum text-sm font-semibold text-ink">
                          {formatToman(product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <aside className="h-fit rounded-2xl border border-border bg-surface p-5">
              <h2 className="text-sm font-semibold text-ink">خلاصه سفارش</h2>
              <div className="mt-4 flex justify-between text-sm text-ink-soft">
                <span>تعداد کالا</span>
                <span className="tnum">{count.toLocaleString("fa-IR")}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm text-ink-soft">
                <span>جمع جزء</span>
                <span className="tnum">{formatToman(subtotal)}</span>
              </div>
              <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-semibold text-ink">
                <span>مبلغ قابل پرداخت</span>
                <span className="tnum">{formatToman(subtotal)}</span>
              </div>
              <p className="mt-2 text-xs leading-6 text-ink-faint">
                قیمت‌ها عمده زیره کار است. مبلغ نهایی بر اساس جنس چوب و رنگ انتخابی توسط کارشناسان
                ما پیش از پرداخت با شما هماهنگ می‌شود.
              </p>
              <Link
                to="/checkout"
                className="mt-6 block rounded-full bg-ink py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-gold-dark"
              >
                ادامه فرآیند خرید
              </Link>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
