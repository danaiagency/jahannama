import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeadphonesIcon, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CategoryCard from "@/components/product/CategoryCard";
import ProductCard from "@/components/product/ProductCard";
import LazyImage from "@/components/ui/LazyImage";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { formatToman } from "@/utils/format";
import { heroImage } from "@/data/images";

const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
const spotlight = bestSellers[0];

const benefits = [
  { icon: Truck, title: "ارسال به سراسر کشور", text: "تحویل درب منزل در تمام شهرها" },
  { icon: ShieldCheck, title: "ضمانت اصالت کالا", text: "مواد اولیه و ساخت با کیفیت تضمینی" },
  { icon: RotateCcw, title: "امکان مرجوعی", text: "بازگشت کالا تا ۷ روز پس از تحویل" },
  { icon: HeadphonesIcon, title: "پشتیبانی تلفنی", text: "پاسخ‌گویی کارشناسان هر روز هفته" },
];

export default function Home() {
  return (
    <>
      <title>مبلمان جهان‌نما | فروشگاه آنلاین مبلمان مدرن و لوکس</title>

      {/* Hero */}
      <section className="container-page pt-8 md:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-medium tracking-wide text-gold">
              مبلمان جهان‌نما
            </span>
            <h1 className="mt-3 text-3xl font-bold leading-[1.3] text-ink sm:text-4xl md:text-5xl md:leading-[1.25]">
              خانه‌ای که با سلیقه شما شکل می‌گیرد
            </h1>
            <p className="mt-5 max-w-md text-base leading-8 text-ink-soft">
              مجموعه‌ای از مبلمان مدرن و باکیفیت برای ساختن فضایی گرم، شیک و ماندگار.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
              >
                مشاهده محصولات
              </Link>
              <Link
                to="/shop?sort=newest"
                className="rounded-full border border-border px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-gold hover:text-gold-dark"
              >
                مشاهده کالکشن جدید
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <LazyImage
              src={heroImage()}
              alt="فضای نشیمن مدرن با مبلمان جهان‌نما"
              ratio="aspect-[4/5] sm:aspect-[5/4]"
              className="rounded-3xl"
            />

            {spotlight && (
              <Link
                to={`/product/${spotlight.slug}`}
                className="absolute -bottom-6 right-6 flex w-56 items-center gap-3 rounded-2xl border border-border bg-surface p-3 shadow-lift transition-transform hover:-translate-y-0.5 sm:right-8"
              >
                <LazyImage
                  src={spotlight.images[0]}
                  alt={spotlight.title}
                  ratio="aspect-square"
                  className="w-14 shrink-0 rounded-xl"
                />
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-gold">پرفروش‌ترین</p>
                  <p className="truncate text-sm font-medium text-ink">{spotlight.title}</p>
                  <p className="tnum mt-0.5 text-xs text-ink-soft">
                    {formatToman(spotlight.price)}
                  </p>
                </div>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page mt-24 md:mt-32">
        <SectionHeading eyebrow="دسته‌بندی‌ها" title="مبلمان را بر اساس نیاز خود پیدا کنید" />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section className="container-page mt-24 md:mt-32">
        <SectionHeading
          eyebrow="پرفروش‌ترین‌ها"
          title="محصولات پرطرفدار جهان‌نما"
          ctaLabel="مشاهده همه"
          ctaTo="/shop"
        />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <section className="container-page mt-24 md:mt-32">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center sm:px-14">
          <p className="text-xs font-medium tracking-wide text-gold-light">
            مستقیم از تولیدی
          </p>
          <h2 className="mt-3 text-2xl font-bold leading-[1.4] text-white sm:text-3xl">
            قیمت عمده زیره کار، بدون واسطه
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/70">
            جنس چوب و رنگ محصولات به انتخاب شماست؛ کیفیت ساخت جهان‌نما را با قیمت تولیدی تجربه کنید.
          </p>
          <Link
            to="/shop"
            className="mt-7 inline-flex rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-gold-light"
          >
            مشاهده محصولات
          </Link>
        </div>
      </section>

      {/* New arrivals */}
      <section className="container-page mt-24 md:mt-32">
        <SectionHeading
          eyebrow="تازه‌ها"
          title="محصولات جدید"
          ctaLabel="مشاهده همه"
          ctaTo="/shop?sort=newest"
        />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="container-page mt-24 mb-28 md:mt-32 md:mb-36">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-tint">
                <Icon className="h-5 w-5 text-gold-dark" strokeWidth={1.75} />
              </div>
              <h3 className="text-sm font-semibold text-ink">{title}</h3>
              <p className="text-xs leading-6 text-ink-soft">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
