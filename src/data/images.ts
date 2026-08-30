/**
 * شناسه تصاویر Unsplash که صحت آن‌ها بررسی شده است.
 * برای جلوگیری از تصویر خراب، فقط از همین مجموعه در سراسر سایت استفاده می‌شود.
 */
export const IMG = {
  heroLiving: "1758448511322-8bfc73daf606",
  sofaCozy: "1756302555654-5e413da2d1b8",
  sofaGray: "1757862351841-c6f7ac0b0201",
  sofaCurved: "1761602866012-ae9f888255dc",
  sofaWide: "1758448511322-8bfc73daf606",
  diningTable: "1758977403403-c51ef509e788",
  armchair: "1584467331225-a18e17c70b38",
} as const;

/** ساخت URL بهینه Unsplash با عرض و کیفیت مشخص برای Lazy Loading و Performance بهتر. */
export function unsplash(id: string, width = 800, quality = 80): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}
