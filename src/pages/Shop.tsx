import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, SearchX } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import FilterForm from "@/components/product/FilterForm";
import FilterDrawer from "@/components/product/FilterDrawer";
import EmptyState from "@/components/ui/EmptyState";
import { products } from "@/data/products";
import {
  applyFilters,
  emptyFilters,
  sortProducts,
  sortOptions,
  type ShopFilters,
  type SortOption,
} from "@/components/product/filterTypes";
import type { CategorySlug } from "@/types";

const PAGE_SIZE = 8;

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [filters, setFilters] = useState<ShopFilters>(() => {
    const category = params.get("category") as CategorySlug | null;
    return { ...emptyFilters, categories: category ? [category] : [] };
  });
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const query = params.get("q") ?? "";
  const sort = (params.get("sort") as SortOption) ?? "bestseller";

  const filtered = useMemo(() => {
    const result = applyFilters(products, filters, query);
    return sortProducts(result, sort);
  }, [filters, query, sort]);

  const visibleProducts = filtered.slice(0, visible);

  function updateSort(next: SortOption) {
    const p = new URLSearchParams(params);
    p.set("sort", next);
    setParams(p, { replace: true });
  }

  function clearFilters() {
    setFilters(emptyFilters);
    const p = new URLSearchParams(params);
    p.delete("category");
    setParams(p, { replace: true });
  }

  return (
    <>
      <title>فروشگاه | مبلمان جهان‌نما</title>

      <div className="container-page py-8 md:py-12">
        <div className="mb-8 flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-ink md:text-3xl">فروشگاه</h1>
          <p className="text-sm text-ink-soft">
            {filtered.length.toLocaleString("fa-IR")} محصول
            {query && <> برای «{query}»</>}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[15rem_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <FilterForm filters={filters} onChange={setFilters} onClear={clearFilters} />
            </div>
          </aside>

          <div>
            <div className="mb-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm text-ink lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" strokeWidth={1.75} />
                فیلترها
              </button>

              <select
                value={sort}
                onChange={(e) => updateSort(e.target.value as SortOption)}
                aria-label="مرتب‌سازی"
                className="mr-auto rounded-full border border-border bg-surface px-4 py-2.5 text-sm text-ink outline-none focus-visible:border-gold"
              >
                {sortOptions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {visibleProducts.length === 0 ? (
              <EmptyState
                icon={SearchX}
                title="محصولی یافت نشد"
                description="فیلترهای انتخابی شما نتیجه‌ای نداشت. فیلترها را تغییر دهید یا پاک کنید."
                actionLabel="پاک کردن فیلترها"
                actionTo="/shop"
              />
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6 xl:grid-cols-4">
                  {visibleProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>

                {visible < filtered.length && (
                  <div className="mt-10 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setVisible((v) => v + PAGE_SIZE)}
                      className="rounded-full border border-border px-7 py-3 text-sm font-medium text-ink transition-colors hover:border-gold hover:text-gold-dark"
                    >
                      نمایش محصولات بیشتر
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={setFilters}
        onClear={clearFilters}
        resultCount={filtered.length}
      />
    </>
  );
}
