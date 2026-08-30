/**
 * تنظیمات سراسری سایت — اطلاعات تماس، پرداخت و لینک پیام‌رسان‌ها.
 * هیچ Component نباید مستقیماً این مقادیر را Hardcode کند؛ همیشه از اینجا Import شود.
 *
 * نکته: شماره کارت و شبا هنوز Demo هستند — پیش از انتشار واقعی با اطلاعات
 * بانکی واقعی جایگزین شوند.
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

  // شماره کارت و شبا فعلاً Demo هستند — پیش از انتشار واقعی جایگزین شوند.
  bankTransfer: {
    accountHolder: "مبلمان جهان‌نما",
    cardNumber: "6037-XXXX-XXXX-1234",
    shabaNumber: "IRXX XXXX XXXX XXXX XXXX XXXX XX",
  },

  messengers: {
    whatsapp: "https://wa.me/989128516383",
    rubika: "https://rubika.ir/jahan_nama_mobl2026",
  },

  social: {
    instagram: "https://www.instagram.com/jahan_nama_mobl2026",
    whatsapp: "https://wa.me/989128516383",
    rubika: "https://rubika.ir/jahan_nama_mobl2026",
  },
} as const;
