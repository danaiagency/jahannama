import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Clock3, PackageCheck } from "lucide-react";
import { useOrderStore } from "@/store/order";
import { siteConfig } from "@/config/site";
import { formatToman } from "@/utils/format";

export default function OrderSuccess() {
  const order = useOrderStore((s) => s.lastOrder);
  const [messengerNotice, setMessengerNotice] = useState(false);

  if (!order) return <Navigate to="/" replace />;

  return (
    <>
      <title>سفارش شما ثبت شد | مبلمان جهان‌نما</title>

      <div className="container-page flex max-w-lg flex-col items-center py-16 text-center md:py-24">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-tint">
          <PackageCheck className="h-7 w-7 text-gold-dark" strokeWidth={1.75} />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-ink md:text-3xl">سفارش شما ثبت شد</h1>

        <p className="mt-4 text-sm leading-8 text-ink-soft">
          سفارش شما با موفقیت در سیستم ثبت شد. برای نهایی شدن سفارش، مبلغ سفارش را به شماره کارت
          اعلام‌شده واریز کرده و تصویر رسید پرداخت را از طریق واتساپ یا روبیکا برای ما ارسال کنید.
        </p>

        <div className="tnum mt-6 rounded-xl bg-surface-soft px-5 py-3 text-sm font-medium text-ink">
          شماره سفارش: #{order.orderNumber}
        </div>

        <div className="mt-3 tnum text-sm text-ink-soft">
          مبلغ سفارش: {formatToman(order.total)}
        </div>

        <div className="mt-8 flex w-full items-start gap-3 rounded-2xl border border-amber-tint bg-amber-tint p-4 text-right">
          <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-amber" strokeWidth={1.75} />
          <div>
            <p className="text-sm font-semibold text-amber">در انتظار تأیید پرداخت</p>
            <p className="mt-1 text-xs leading-6 text-ink-soft">
              پس از ارسال رسید، کارشناسان ما پرداخت شما را بررسی می‌کنند. پس از تأیید، سفارش شما
              نهایی خواهد شد.
            </p>
          </div>
        </div>

        {messengerNotice && (
          <p className="mt-4 text-xs text-ink-soft">
            پس از ارسال رسید در پیام‌رسان، منتظر تأیید کارشناسان ما باشید.
          </p>
        )}

        <div className="mt-6 grid w-full grid-cols-2 gap-3">
          <a
            href={siteConfig.messengers.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMessengerNotice(true)}
            className="rounded-full border border-border py-3 text-sm font-medium text-ink transition-colors hover:border-gold"
          >
            ارسال رسید در واتساپ
          </a>
          <a
            href={siteConfig.messengers.rubika}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMessengerNotice(true)}
            className="rounded-full border border-border py-3 text-sm font-medium text-ink transition-colors hover:border-gold"
          >
            ارسال رسید در روبیکا
          </a>
        </div>

        <Link
          to="/shop"
          className="mt-8 rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
        >
          بازگشت به فروشگاه
        </Link>
      </div>
    </>
  );
}
