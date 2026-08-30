import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { toPersianDigits } from "@/utils/format";
import { useToastStore } from "@/store/toast";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const showToast = useToastStore((s) => s.show);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    showToast("پیام شما ثبت شد.", "info");
  }

  return (
    <>
      <title>تماس با ما | مبلمان جهان‌نما</title>

      <div className="container-page py-8 md:py-12">
        <h1 className="text-2xl font-bold text-ink md:text-3xl">تماس با ما</h1>
        <p className="mt-3 max-w-md text-sm leading-7 text-ink-soft">
          سوالی درباره محصولات یا سفارش خود دارید؟ فرم زیر را پر کنید یا مستقیم با ما تماس بگیرید.
        </p>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_20rem]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-ink">نام و نام خانوادگی</span>
              <input
                required
                type="text"
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus-visible:border-gold"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-ink">شماره تماس</span>
              <input
                required
                type="text"
                dir="ltr"
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus-visible:border-gold"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-ink">پیام شما</span>
              <textarea
                required
                rows={5}
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus-visible:border-gold"
              />
            </label>
            <button
              type="submit"
              className="rounded-full bg-ink py-3.5 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
            >
              {sent ? "پیام ارسال شد" : "ارسال پیام"}
            </button>
          </form>

          <div className="flex flex-col gap-5 text-sm text-ink-soft">
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold" strokeWidth={1.75} />
              <span dir="ltr" className="tnum">
                {toPersianDigits(siteConfig.contact.mobile)}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold" strokeWidth={1.75} />
              <span dir="ltr">{siteConfig.contact.email}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold" strokeWidth={1.75} />
              <a
                href={siteConfig.contact.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                {siteConfig.contact.address}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
