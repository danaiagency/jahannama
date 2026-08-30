# مبلمان جهان‌نما

فروشگاه اینترنتی مبلمان — کاملاً Frontend، بدون نیاز به بک‌اند.

## اجرا

```bash
npm install
npm run dev
```

سپس آدرس نمایش‌داده‌شده در ترمینال (معمولاً http://localhost:5173) را باز کنید.

## Build نهایی

```bash
npm run build
npm run preview
```

## ساختار مهم

- `src/data/products.ts` — کاتالوگ محصولات Demo (منبع اصلی داده)
- `src/data/categories.ts` — دسته‌بندی‌ها
- `src/config/site.ts` — شماره کارت، شماره شبا، اطلاعات تماس، لینک واتساپ/روبیکا (Demo — پیش از انتشار جایگزین شود)
- `src/store/` — Cart، Wishlist، Toast، Order (Zustand + localStorage)
- `src/pages/` — تمام صفحات سایت

## اتصال Backend در آینده

- `src/types/index.ts` → فیلد `Order.status` برای اتصال به پنل مدیریت آماده است.
- `src/store/order.ts` را می‌توان به‌جای localStorage به API واقعی وصل کرد.
- تمام قیمت‌ها و محصولات Mock هستند و باید از API واقعی جایگزین شوند.
