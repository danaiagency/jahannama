import type { Product } from "@/types";
import { unsplash, IMG } from "./images";

const woodBoth = ["توسکا", "راش"];

const fabricColors = [
  { name: "بژ", hex: "#D9CBB4" },
  { name: "خاکستری", hex: "#8B877D" },
  { name: "زغالی", hex: "#332E29" },
  { name: "کرم", hex: "#ECE3D0" },
  { name: "قهوه‌ای", hex: "#6B4A32" },
];

const sharedSpecsSofa = {
  frameMaterial: "چوب (توسکا یا راش به انتخاب مشتری)",
  fabricMaterial: "پارچه — رنگ به انتخاب مشتری",
  leadTime: "۱۰ تا ۱۵ روز کاری",
};

const sharedSpecsTable = {
  frameMaterial: "چوب (توسکا یا راش به انتخاب مشتری)",
  fabricMaterial: "—",
  leadTime: "۱۰ تا ۱۵ روز کاری",
};

export const products: Product[] = [
  // مبل‌های اصلی
  {
    id: "p01",
    slug: "mobl-panda",
    title: "مبل پاندا",
    category: "mobl-rahati",
    price: 85_000_000,
    inStock: true,
    isBestSeller: true,
    images: [unsplash(IMG.sofaCozy, 1000), unsplash(IMG.sofaWide, 1000)],
    colors: fabricColors,
    woodOptions: woodBoth,
    description:
      "مبل پاندا با نشیمن عمیق و پشتی بلند، یکی از پرفروش‌ترین مدل‌های جهان‌نماست. جنس چوب و رنگ پارچه کاملاً به انتخاب شماست.",
    specs: { dimensions: "۲۲۰ × ۹۵ × ۸۵ سانتی‌متر", ...sharedSpecsSofa },
  },
  {
    id: "p02",
    slug: "mobl-jessica",
    title: "مبل جسیکا",
    category: "mobl-rahati",
    price: 95_000_000,
    inStock: true,
    isNew: true,
    images: [unsplash(IMG.sofaGray, 1000), unsplash(IMG.sofaCozy, 1000)],
    colors: fabricColors,
    woodOptions: woodBoth,
    description:
      "مبل جسیکا با خطوط نرم و کوسن‌های بزرگ، حسی گرم و دنج به فضای نشیمن می‌بخشد. از جدیدترین مدل‌های فروشگاه است.",
    specs: { dimensions: "۲۳۰ × ۹۸ × ۸۶ سانتی‌متر", ...sharedSpecsSofa },
  },
  {
    id: "p03",
    slug: "mobl-l-sydney",
    title: "مبل ال سیدنی",
    category: "mobl-l",
    price: 90_000_000,
    inStock: true,
    isBestSeller: true,
    images: [unsplash(IMG.sofaWide, 1000), unsplash(IMG.sofaCurved, 1000)],
    colors: fabricColors,
    woodOptions: woodBoth,
    description:
      "مبل ال سیدنی با شزلون عریض، انتخابی مناسب برای پذیرایی‌های خانوادگی بزرگ است. یکی از پرفروش‌ترین مدل‌های ال جهان‌نما.",
    specs: { dimensions: "۳۱۰ × ۱۹۰ × ۸۲ سانتی‌متر", ...sharedSpecsSofa },
  },
  {
    id: "p04",
    slug: "mobl-l-martin",
    title: "مبل ال مارتین",
    category: "mobl-l",
    price: 90_000_000,
    inStock: true,
    images: [unsplash(IMG.sofaCurved, 1000), unsplash(IMG.sofaWide, 1000)],
    colors: fabricColors,
    woodOptions: woodBoth,
    description:
      "مبل ال مارتین با طراحی مینیمال و پایه‌های ظریف، انتخابی شیک برای فضاهای مدرن است.",
    specs: { dimensions: "۳۰۰ × ۱۸۵ × ۸۰ سانتی‌متر", ...sharedSpecsSofa },
  },
  {
    id: "p05",
    slug: "mobl-pico",
    title: "مبل پیکو",
    category: "mobl-rahati",
    price: 95_000_000,
    inStock: true,
    isNew: true,
    images: [unsplash(IMG.sofaCozy, 1000), unsplash(IMG.sofaGray, 1000)],
    colors: fabricColors,
    woodOptions: woodBoth,
    description: "مبل پیکو با نشیمن نرم و طراحی به‌روز، از جدیدترین اضافه‌شده‌های فروشگاه است.",
    specs: { dimensions: "۲۱۰ × ۹۰ × ۸۴ سانتی‌متر", ...sharedSpecsSofa },
  },
  {
    id: "p06",
    slug: "mobl-minimal",
    title: "مبل مینیمال",
    category: "mobl-rahati",
    price: 65_000_000,
    inStock: true,
    images: [unsplash(IMG.sofaGray, 1000), unsplash(IMG.sofaCozy, 1000)],
    colors: fabricColors,
    woodOptions: woodBoth,
    description:
      "مبل مینیمال با ابعاد جمع‌وجور و طراحی ساده، گزینه‌ای اقتصادی و شیک برای آپارتمان‌های کوچک‌متراژ است.",
    specs: { dimensions: "۱۸۰ × ۸۵ × ۸۰ سانتی‌متر", ...sharedSpecsSofa },
  },

  // مبل تک — همه هم‌قیمت
  ...["لوکا", "روبی", "کیانا", "دیوا", "آلما"].map(
    (name, i): Product => ({
      id: `p1${i}`,
      slug: `mobl-tak-${["luka", "roobi", "kiana", "diva", "alma"][i]}`,
      title: `مبل تک ${name}`,
      category: "mobl-tak",
      price: 17_000_000,
      inStock: true,
      images: [unsplash(IMG.armchair, 1000), unsplash(IMG.sofaCurved, 1000)],
      colors: fabricColors,
      woodOptions: woodBoth,
      description: `صندلی تک‌نفره ${name} برای گوشه مطالعه یا کنار پنجره، با جنس چوب و رنگ دلخواه شما.`,
      specs: { dimensions: "۸۰ × ۸۵ × ۹۰ سانتی‌متر", ...sharedSpecsSofa },
    })
  ),

  // مبل تک راحتی — همه هم‌قیمت
  ...["سرن", "نوا"].map(
    (name, i): Product => ({
      id: `p2${i}`,
      slug: `mobl-tak-rahati-${["seren", "nova"][i]}`,
      title: `مبل تک راحتی ${name}`,
      category: "mobl-tak-rahati",
      price: 25_000_000,
      inStock: true,
      images: [unsplash(IMG.sofaGray, 1000), unsplash(IMG.armchair, 1000)],
      colors: fabricColors,
      woodOptions: woodBoth,
      description: `مبل تک راحتی ${name} با نشیمن عمیق‌تر نسبت به مدل‌های تک معمولی، برای استراحت طولانی‌تر مناسب است.`,
      specs: { dimensions: "۹۰ × ۹۵ × ۹۵ سانتی‌متر", ...sharedSpecsSofa },
    })
  ),

  // میز ناهارخوری
  {
    id: "p30",
    slug: "miz-nahar-khori-4-nafare",
    title: "میز ناهارخوری ۴ نفره",
    category: "miz-nahar-khori",
    price: 13_250_000,
    inStock: true,
    woodOptions: woodBoth,
    images: [unsplash(IMG.diningTable, 1000), unsplash(IMG.sofaCozy, 1000)],
    description: "ست میز ناهارخوری ۴ نفره، مناسب آشپزخانه یا پذیرایی‌های کوچک.",
    specs: { dimensions: "۱۲۰ × ۸۰ × ۷۵ سانتی‌متر", ...sharedSpecsTable },
  },
  {
    id: "p31",
    slug: "miz-nahar-khori-6-nafare",
    title: "میز ناهارخوری ۶ نفره",
    category: "miz-nahar-khori",
    price: 16_250_000,
    inStock: true,
    woodOptions: woodBoth,
    images: [unsplash(IMG.diningTable, 1000), unsplash(IMG.sofaGray, 1000)],
    description: "ست میز ناهارخوری ۶ نفره، انتخابی رایج برای خانواده‌های متوسط.",
    specs: { dimensions: "۱۶۰ × ۹۰ × ۷۵ سانتی‌متر", ...sharedSpecsTable },
  },
  {
    id: "p32",
    slug: "miz-nahar-khori-8-nafare",
    title: "میز ناهارخوری ۸ نفره",
    category: "miz-nahar-khori",
    price: 18_000_000,
    inStock: true,
    woodOptions: woodBoth,
    images: [unsplash(IMG.diningTable, 1000), unsplash(IMG.sofaCurved, 1000)],
    description: "ست میز ناهارخوری ۸ نفره، مناسب پذیرایی‌های خانوادگی بزرگ‌تر.",
    specs: { dimensions: "۲۰۰ × ۱۰۰ × ۷۵ سانتی‌متر", ...sharedSpecsTable },
  },
  {
    id: "p33",
    slug: "miz-nahar-khori-10-nafare",
    title: "میز ناهارخوری ۱۰ نفره",
    category: "miz-nahar-khori",
    price: 23_000_000,
    inStock: true,
    woodOptions: woodBoth,
    images: [unsplash(IMG.diningTable, 1000), unsplash(IMG.sofaWide, 1000)],
    description: "ست میز ناهارخوری ۱۰ نفره، مناسب سالن‌های پذیرایی بزرگ و جمع‌های خانوادگی پرتعداد.",
    specs: { dimensions: "۲۴۰ × ۱۰۵ × ۷۵ سانتی‌متر", ...sharedSpecsTable },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, limit);
}
