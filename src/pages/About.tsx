import LazyImage from "@/components/ui/LazyImage";
import { aboutImage } from "@/data/images";
import { siteConfig } from "@/config/site";

export default function About() {
  return (
    <>
      <title>درباره ما | مبلمان جهان‌نما</title>

      <div className="container-page py-8 md:py-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-xs font-medium tracking-wide text-gold">درباره ما</span>
            <h1 className="mt-3 text-2xl font-bold leading-[1.4] text-ink md:text-3xl">
              مبلمانی که با گذر زمان زیباتر می‌شود
            </h1>
            <p className="mt-5 text-sm leading-8 text-ink-soft">
              {siteConfig.brand.fullName} از دل علاقه به طراحی داخلی و تجربه سال‌ها ساخت مبلمان
              شکل گرفت. هدف ما ساده است: مبلمانی بسازیم که نه‌تنها زیبا باشد، بلکه سال‌ها در کنار
              خانواده شما دوام بیاورد.
            </p>
            <p className="mt-4 text-sm leading-8 text-ink-soft">
              هر محصول با انتخاب دقیق چوب، پارچه و فوم، و زیر نظر تیمی که به جزئیات اهمیت می‌دهد
              ساخته می‌شود. از طراحی گرفته تا بسته‌بندی و ارسال، تلاش می‌کنیم تجربه‌ای مطمئن و
              لذت‌بخش برای شما رقم بزنیم.
            </p>
          </div>
          <LazyImage
            src={aboutImage()}
            alt="کارگاه طراحی مبلمان جهان‌نما"
            ratio="aspect-[4/5]"
            className="rounded-3xl"
          />
        </div>
      </div>
    </>
  );
}
