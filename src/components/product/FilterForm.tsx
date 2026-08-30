import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { priceBuckets, type ShopFilters } from "./filterTypes";
import type { CategorySlug } from "@/types";

const allColors = Array.from(
  new Set(products.flatMap((p) => (p.colors ?? []).map((c) => c.name)))
);

export default function FilterForm({
  filters,
  onChange,
  onClear,
}: {
  filters: ShopFilters;
  onChange: (next: ShopFilters) => void;
  onClear: () => void;
}) {
  function toggleCategory(slug: CategorySlug) {
    const has = filters.categories.includes(slug);
    onChange({
      ...filters,
      categories: has
        ? filters.categories.filter((c) => c !== slug)
        : [...filters.categories, slug],
    });
  }

  function toggleColor(name: string) {
    const has = filters.colors.includes(name);
    onChange({
      ...filters,
      colors: has ? filters.colors.filter((c) => c !== name) : [...filters.colors, name],
    });
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink">فیلترها</h3>
        <button type="button" onClick={onClear} className="text-xs text-ink-soft hover:text-gold">
          پاک کردن
        </button>
      </div>

      <fieldset>
        <legend className="mb-3 text-xs font-medium text-ink-faint">دسته‌بندی</legend>
        <div className="flex flex-col gap-2.5">
          {categories.map((c) => (
            <label key={c.slug} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft">
              <input
                type="checkbox"
                checked={filters.categories.includes(c.slug)}
                onChange={() => toggleCategory(c.slug)}
                className="h-4 w-4 rounded border-border text-gold accent-[#a9793c] focus-visible:outline-2 focus-visible:outline-gold"
              />
              {c.title}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-medium text-ink-faint">محدوده قیمت</legend>
        <div className="flex flex-col gap-2.5">
          {priceBuckets.map((b) => (
            <label key={b.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft">
              <input
                type="radio"
                name="priceBucket"
                checked={filters.priceBucket === b.id}
                onChange={() => onChange({ ...filters, priceBucket: b.id })}
                className="h-4 w-4 border-border text-gold accent-[#a9793c] focus-visible:outline-2 focus-visible:outline-gold"
              />
              {b.label}
            </label>
          ))}
          {filters.priceBucket && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, priceBucket: null })}
              className="w-fit text-xs text-ink-faint underline underline-offset-2 hover:text-gold"
            >
              حذف محدوده قیمت
            </button>
          )}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-xs font-medium text-ink-faint">رنگ</legend>
        <div className="flex flex-wrap gap-2">
          {allColors.map((name) => {
            const swatch = products.flatMap((p) => p.colors ?? []).find((c) => c.name === name);
            const active = filters.colors.includes(name);
            return (
              <button
                key={name}
                type="button"
                onClick={() => toggleColor(name)}
                title={name}
                aria-pressed={active}
                aria-label={name}
                className={`h-8 w-8 rounded-full border-2 transition-transform ${
                  active ? "scale-110 border-gold" : "border-transparent"
                }`}
                style={{ backgroundColor: swatch?.hex }}
              />
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
            className="h-4 w-4 rounded border-border text-gold accent-[#a9793c] focus-visible:outline-2 focus-visible:outline-gold"
          />
          فقط کالای موجود
        </label>
      </fieldset>
    </div>
  );
}
