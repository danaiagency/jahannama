/** تولید شماره سفارش نمایشی، مثلاً «JN-58241». در آینده این مقدار از Backend دریافت خواهد شد. */
export function generateOrderNumber(): string {
  const random = Math.floor(10000 + Math.random() * 90000);
  return `JN-${random}`;
}
