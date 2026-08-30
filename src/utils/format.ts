const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** تبدیل اعداد لاتین به فارسی، مثلاً برای نمایش قیمت و تعداد. */
export function toPersianDigits(input: number | string): string {
  return String(input).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

/** فرمت قیمت با جداکننده هزارگان و واحد تومان، با اعداد فارسی. */
export function formatToman(amount: number): string {
  const withSeparators = new Intl.NumberFormat("en-US").format(amount);
  return `${toPersianDigits(withSeparators)} تومان`;
}

/** درصد تخفیف بین قیمت اصلی و قیمت قبل از تخفیف. */
export function discountPercent(price: number, compareAt?: number): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}
