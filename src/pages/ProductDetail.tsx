import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Check, Info, Truck } from "lucide-react";
import Gallery from "@/components/product/Gallery";
import QuantityStepper from "@/components/product/QuantityStepper";
import ProductCard from "@/components/product/ProductCard";
import Badge from "@/components/ui/Badge";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { getCategoryTitle } from "@/data/categories";
import { formatToman } from "@/utils/format";
import { useCartStore } from "@/store/cart";
import { useToastStore } from "@/store/toast";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;

  const [color, setColor] = useState(product?.colors?.[0]?.name ?? "");
  const [wood, setWood] = useState(product?.woodOptions[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useToastStore((s) => s.show);

  if (!product) return <Navigate to="/404" replace />;

  const related = getRelatedProducts(product);

  function handleAdd() {
    if (!product) return;
    addItem(product.id, color || "بدون رنگ", wood, quantity);
    showToast("محصول به سبد خرید اضافه شد.");
  }

  return (
    <>
      <title>{product.title} | مبلمان جهان‌نما</title>

      <div className="container-page py-8 md:py-12">
        <nav className="mb-6 text-xs text-ink-faint">
          فروشگاه <span className="mx-1.5">/</span> {getCategoryTitle(product.category)}{" "}
          <span className="mx-1.5">/</span> <span className="text-ink-soft">{product.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Gallery images={product.images} alt={product.title} />

          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              {product.isNew && <Badge tone="gold">جدید</Badge>}
              {product.isBestSeller && <Badge tone="ink">پرفروش</Badge>}
            </div>

            <h1 className="text-2xl font-bold text-ink md:text-3xl">{product.title}</h1>

            <div className="mt-4">
              <span className="tnum text-2xl font-bold text-ink">
                {formatToman(product.price)}
              </span>
              <p className="mt-1 text-xs text-ink-faint">قیمت عمده زیره کار</p>
            </div>

            <p className="mt-2 text-sm">
              {product.inStock ? (
                <span className="flex items-center gap-1.5 text-green">
                  <Check className="h-4 w-4" strokeWidth={2} /> موجود در انبار
                </span>
              ) : (
                <span className="text-red">ناموجود</span>
              )}
            </p>

            <p className="mt-6 max-w-md text-sm leading-7 text-ink-soft">
              {product.description}
            </p>

            {product.colors && product.colors.length > 0 && (
              <div className="mt-7">
                <p className="mb-2.5 text-xs font-medium text-ink-faint">
                  رنگ: <span className="text-ink">{color}</span>
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setColor(c.name)}
                      title={c.name}
                      aria-pressed={color === c.name}
                      aria-label={c.name}
                      className={`h-9 w-9 rounded-full border-2 transition-transform ${
                        color === c.name ? "scale-110 border-gold" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
                <p className="mt-2 text-xs text-ink-faint">
                  رنگ‌های بالا صرفاً نمونه هستند؛ رنگ دلخواه خود را می‌توانید در توضیحات سفارش اعلام
                  کنید.
                </p>
              </div>
            )}

            <div className="mt-7">
              <p className="mb-2.5 text-xs font-medium text-ink-faint">
                جنس چوب: <span className="text-ink">{wood}</span>
              </p>
              <div className="flex gap-2.5">
                {product.woodOptions.map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWood(w)}
                    aria-pressed={wood === w}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      wood === w
                        ? "border-gold bg-gold-tint text-gold-dark"
                        : "border-border text-ink-soft hover:border-gold"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 flex items-center gap-4">
              <QuantityStepper value={quantity} onChange={setQuantity} />
              <button
                type="button"
                onClick={handleAdd}
                disabled={!product.inStock}
                className="flex-1 rounded-full bg-ink py-3.5 text-sm font-medium text-white transition-colors hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                افزودن به سبد خرید
              </button>
            </div>

            <div className="mt-6 flex items-start gap-2 rounded-2xl bg-surface-soft p-3.5 text-xs text-ink-soft">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" strokeWidth={1.75} />
              قیمت نهایی بر اساس جنس چوب و رنگ انتخابی و نوسانات بازار ممکن است تغییر کند و پیش از
              پرداخت نهایی توسط کارشناسان ما با شما هماهنگ می‌شود.
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-2xl bg-surface-soft p-3.5 text-xs text-ink-soft">
              <Truck className="h-4 w-4 shrink-0 text-ink-faint" strokeWidth={1.75} />
              زمان آماده‌سازی و ارسال: {product.specs.leadTime}
            </div>

            <dl className="mt-8 divide-y divide-border border-t border-border">
              {[
                { label: "ابعاد", value: product.specs.dimensions },
                { label: "جنس بدنه", value: product.specs.frameMaterial },
                { label: "جنس پارچه/چرم", value: product.specs.fabricMaterial },
                { label: "زمان آماده‌سازی", value: product.specs.leadTime },
              ].map((row) => (
                <div key={row.label} className="flex justify-between gap-4 py-3 text-sm">
                  <dt className="text-ink-soft">{row.label}</dt>
                  <dd className="text-left text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24 md:mt-32">
            <h2 className="mb-8 text-xl font-bold text-ink md:text-2xl">محصولات مشابه</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
