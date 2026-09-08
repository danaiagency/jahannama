import type { Order } from "@/types";
import { products } from "@/data/products";
import { formatToman, toPersianDigits } from "./format";

/** تولید شماره سفارش نمایشی، مثلاً «JN-58241». در آینده این مقدار از Backend دریافت خواهد شد. */
export function generateOrderNumber(): string {
  const random = Math.floor(10000 + Math.random() * 90000);
  return `JN-${random}`;
}

/** ساخت متن آماده سفارش برای ارسال در پیام‌رسان (واتساپ/روبیکا) — کاملاً Client-Side. */
export function buildOrderMessage(order: Order): string {
  const lines: string[] = [];

  lines.push("سفارش جدید — مبلمان جهان‌نما");
  lines.push(`شماره سفارش: ${order.orderNumber}`);
  lines.push("");
  lines.push(`نام مشتری: ${order.customer.fullName}`);
  lines.push(`شماره تماس: ${toPersianDigits(order.customer.phone)}`);
  lines.push(`آدرس: ${order.customer.address}`);
  lines.push(`کد پستی: ${toPersianDigits(order.customer.postalCode)}`);
  if (order.customer.notes?.trim()) {
    lines.push(`توضیحات: ${order.customer.notes.trim()}`);
  }

  lines.push("");
  lines.push("محصولات:");
  for (const item of order.items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;
    lines.push(
      `- ${product.title} × ${toPersianDigits(item.quantity)} | رنگ: ${item.colorName} | جنس چوب: ${item.woodMaterial}`
    );
  }

  lines.push("");
  lines.push(`مبلغ کل: ${formatToman(order.total)} (قیمت عمده زیره کار)`);
  lines.push("مبلغ نهایی پس از هماهنگی با کارشناس فروش قطعی می‌شود.");

  return lines.join("\n");
}
