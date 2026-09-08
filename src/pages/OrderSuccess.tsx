import { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Copy, Send } from "lucide-react";
import { useOrderStore } from "@/store/order";
import { useToastStore } from "@/store/toast";
import { siteConfig } from "@/config/site";
import { buildOrderMessage } from "@/utils/order";

export default function OrderSuccess() {
  const order = useOrderStore((s) => s.lastOrder);
  const showToast = useToastStore((s) => s.show);
  const [messengerNotice, setMessengerNotice] = useState(false);

  const message = useMemo(() => (order ? buildOrderMessage(order) : ""), [order]);

  if (!order) return <Navigate to="/" replace />;

  // واتساپ از پارامتر رسمی text?= برای پیش‌نویس پیام پشتیبانی می‌کند.
  const whatsappHref = `${siteConfig.messengers.whatsapp}?text=${encodeURIComponent(message)}`;
  // روبیکا API عمومی برای پیش‌نویس پیام در چت معمولی ندارد؛ فقط لینک چت باز می‌شود.
  const rubikaHref = siteConfig.messengers.rubika;

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      showToast("متن سفارش کپی شد.", "info");
    } catch {
      showToast("کپی انجام نشد؛ متن را دستی انتخاب و کپی کنید.", "info");
    }
  }

  return (
    <>
      <title>درخواست شما ثبت شد | مبلمان جهان‌نما</title>

      <div className="container-page flex max-w-lg flex-col items-center py-16 text-center md:py-24">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-tint">
          <Send className="h-7 w-7 text-gold-dark" strokeWidth={1.75} />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-ink md:text-3xl">درخواست شما آماده ارسال است</h1>

        <p className="mt-4 text-sm leading-8 text-ink-soft">
          یکی از پیام‌رسان‌های زیر را انتخاب کنید تا خلاصه سفارش برای کارشناس فروش ارسال شود.
          ایشان در اسرع وقت جهت تکمیل فرآیند خرید (قیمت نهایی و روش پرداخت) با شما تماس می‌گیرند.
        </p>

        <div className="tnum mt-6 rounded-xl bg-surface-soft px-5 py-3 text-sm font-medium text-ink">
          شماره سفارش: #{order.orderNumber}
        </div>

        <p className="mt-8 w-full text-right text-xs font-medium text-ink-faint">
          روش ارسال سفارش به فروشگاه را انتخاب کنید:
        </p>

        <div className="mt-3 grid w-full grid-cols-2 gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMessengerNotice(true)}
            className="rounded-full border border-border py-3 text-sm font-medium text-ink transition-colors hover:border-gold"
          >
            🟢 ارسال در واتساپ
          </a>
          <a
            href={rubikaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMessengerNotice(true)}
            className="rounded-full border border-border py-3 text-sm font-medium text-ink transition-colors hover:border-gold"
          >
            🟠 باز کردن روبیکا
          </a>
        </div>

        <button
          type="button"
          onClick={copyMessage}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-xs font-medium text-ink-soft transition-colors hover:text-gold-dark"
        >
          <Copy className="h-3.5 w-3.5" strokeWidth={1.75} />
          کپی متن سفارش
        </button>

        <p className="mt-1 text-[11px] leading-5 text-ink-faint">
          در واتساپ متن سفارش به‌طور خودکار در پیام قرار می‌گیرد؛ در روبیکا ابتدا «کپی متن سفارش»
          را بزنید و پس از باز شدن گفتگو، آن را Paste کنید.
        </p>

        {messengerNotice && (
          <p className="mt-4 text-xs text-ink-soft">
            درخواست شما برای کارشناس فروش ارسال شد. ایشان در اسرع وقت جهت تکمیل فرآیند خرید با شما
            تماس می‌گیرند.
          </p>
        )}

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
