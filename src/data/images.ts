/**
 * تصاویر پروژه به‌طور کامل محلی (public/images) مدیریت می‌شوند — Unsplash حذف شده است.
 *
 * قانون نام‌گذاری (برای اضافه/جایگزینی عکس، فقط فایل را با همین اسم در پوشه بگذارید،
 * هیچ کدی نیازی به تغییر ندارد):
 *
 *   عکس محصول:      public/images/products/{slug}-1.jpg  و  {slug}-2.jpg
 *   عکس دسته‌بندی:  public/images/categories/{slug}.jpg
 *   عکس Hero:        public/images/hero.jpg
 *   عکس درباره‌ما:   public/images/about.jpg
 *
 * تا وقتی فایل واقعی آپلود نشده، LazyImage به‌صورت خودکار placeholder.svg را نشان می‌دهد
 * (نگاه کنید به onError در src/components/ui/LazyImage.tsx) — هرگز آیکون عکس خراب دیده نمی‌شود.
 */

function withBase(path: string): string {
  return `${import.meta.env.BASE_URL}images/${path}`;
}

export function heroImage(): string {
  return withBase("hero.jpg");
}

export function aboutImage(): string {
  return withBase("about.jpg");
}

export function productImage(slug: string, index: 1 | 2): string {
  return withBase(`products/${slug}-${index}.jpg`);
}

export function categoryImage(slug: string): string {
  return withBase(`categories/${slug}.jpg`);
}

export function placeholderImage(): string {
  return withBase("placeholder.svg");
}
