/**
 * تنظیمات سراسری سایت — اطلاعات تماس و لینک پیام‌رسان‌ها.
 * هیچ Component نباید مستقیماً این مقادیر را Hardcode کند؛ همیشه از اینجا Import شود.
 */

export const siteConfig = {
  brand: {
    name: "جهان‌نما",
    fullName: "مبلمان جهان‌نما",
    tagline: "مبلمانی برای خانه‌ای که دوستش دارید",
  },

  contact: {
    mobile: "09128516383",
    address: "قم، خیابان کلهری، کوچه امام رضا شمالی، کوچه ۱",
    mapLink: "https://nshn.ir/sbsjNGGx1ene",
    email: "info@jahannama-demo.ir",
  },

  // برای ارسال درخواست سفارش — اکانت شخصی (نه کانال)، چون کانال قابلیت دریافت پیام ندارد.
  messengers: {
    whatsapp: "https://wa.me/989128516383",
    rubika: "https://rubika.ir/Magic1234567",
  },

  // برای دنبال‌کردن/معرفی برند — کانال عمومی روبیکا.
  social: {
    instagram: "https://www.instagram.com/jahan_nama_mobl2026",
    whatsapp: "https://wa.me/989128516383",
    rubika: "https://rubika.ir/jahan_nama_mobl2026",
  },
} as const;
