import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Copy, Landmark, ShieldCheck } from "lucide-react";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import { useCartStore, useCartTotals } from "@/store/cart";
import { useOrderStore } from "@/store/order";
import { useToastStore } from "@/store/toast";
import { siteConfig } from "@/config/site";
import { formatToman, toPersianDigits } from "@/utils/format";
import { generateOrderNumber } from "@/utils/order";
import type { CustomerInfo } from "@/types";

const emptyCustomer: CustomerInfo = {
  fullName: "",
  phone: "",
  address: "",
  postalCode: "",
  notes: "",
};

export default function Checkout() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);
  const { subtotal } = useCartTotals();
  const setLastOrder = useOrderStore((s) => s.setLastOrder);
  const showToast = useToastStore((s) => s.show);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState<CustomerInfo>(emptyCustomer);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});

  if (items.length === 0) return <Navigate to="/cart" replace />;

  function validateStep1() {
    const next: typeof errors = {};
    if (!customer.fullName.trim()) next.fullName = "نام و نام خانوادگی را وارد کنید.";
    if (!/^0?9\d{9}$/.test(customer.phone.trim())) next.phone = "شماره موبایل معتبر وارد کنید.";
    if (!customer.address.trim()) next.address = "آدرس را وارد کنید.";
    if (!/^\d{10}$/.test(customer.postalCode.trim())) next.postalCode = "کد پستی ۱۰ رقمی وارد کنید.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmitOrder() {
    const order = {
      orderNumber: generateOrderNumber(),
      status: "pending_payment" as const,
      customer,
      items,
      total: subtotal,
      createdAt: new Date().toISOString(),
    };
    setLastOrder(order);
    clearCart();
    navigate("/order-success");
  }

  return (
    <>
      <title>تسویه حساب | مبلمان جهان‌نما</title>

      <div className="container-page max-w-2xl py-8 md:py-12">
        <h1 className="mb-8 text-2xl font-bold text-ink md:text-3xl">تکمیل سفارش</h1>
        <CheckoutSteps current={step} />

        {step === 1 && (
          <div className="flex flex-col gap-5">
            <Field
              label="نام و نام خانوادگی"
              value={customer.fullName}
              error={errors.fullName}
              onChange={(v) => setCustomer({ ...customer, fullName: v })}
            />
            <Field
              label="شماره موبایل"
              value={customer.phone}
              error={errors.phone}
              inputMode="numeric"
              dir="ltr"
              onChange={(v) => setCustomer({ ...customer, phone: v })}
            />
            <Field
              label="آدرس کامل"
              value={customer.address}
              error={errors.address}
              multiline
              onChange={(v) => setCustomer({ ...customer, address: v })}
            />
            <Field
              label="کد پستی"
              value={customer.postalCode}
              error={errors.postalCode}
              inputMode="numeric"
              dir="ltr"
              onChange={(v) => setCustomer({ ...customer, postalCode: v })}
            />
            <Field
              label="توضیحات سفارش (اختیاری)"
              value={customer.notes ?? ""}
              multiline
              onChange={(v) => setCustomer({ ...customer, notes: v })}
            />

            <button
              type="button"
              onClick={() => validateStep1() && setStep(2)}
              className="mt-2 rounded-full bg-ink py-3.5 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
            >
              ادامه
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-gold bg-gold-tint/40 p-4">
              <input type="radio" checked readOnly className="mt-1 accent-[#a9793c]" />
              <span>
                <span className="flex items-center gap-2 text-sm font-medium text-ink">
                  <Landmark className="h-4 w-4" strokeWidth={1.75} /> کارت به کارت
                </span>
                <span className="mt-1 block text-xs text-ink-soft">
                  انتقال وجه مستقیم به شماره کارت فروشگاه و ارسال رسید پرداخت.
                </span>
              </span>
            </label>

            <div className="flex cursor-not-allowed items-start gap-3 rounded-2xl border border-border p-4 opacity-50">
              <input type="radio" disabled className="mt-1" />
              <span>
                <span className="text-sm font-medium text-ink">درگاه بانکی آنلاین</span>
                <span className="mt-1 block text-xs text-ink-soft">به‌زودی فعال می‌شود.</span>
              </span>
            </div>

            <div className="mt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 rounded-full border border-border py-3.5 text-sm font-medium text-ink"
              >
                بازگشت
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 rounded-full bg-ink py-3.5 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
              >
                ادامه
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                <ShieldCheck className="h-4.5 w-4.5 text-gold" strokeWidth={1.75} />
                اطلاعات واریز
              </div>

              <dl className="mt-4 flex flex-col gap-3 text-sm">
                <Row label="به نام" value={siteConfig.bankTransfer.accountHolder} />
                <Row
                  label="شماره کارت"
                  value={siteConfig.bankTransfer.cardNumber}
                  copyable
                  onCopy={() => showToast("شماره کارت کپی شد.", "info")}
                />
                <Row label="شماره شبا" value={siteConfig.bankTransfer.shabaNumber} dir="ltr" />
              </dl>

              <p className="tnum mt-4 rounded-xl bg-surface-soft p-3 text-sm font-semibold text-ink">
                مبلغ قابل واریز: {formatToman(subtotal)}
              </p>
              <p className="mt-2 text-xs leading-6 text-ink-faint">
                قیمت‌های سایت عمده زیره کار است. مبلغ نهایی بر اساس جنس چوب و رنگ انتخابی و
                نوسانات بازار ممکن است تغییر کند و پیش از پرداخت نهایی توسط کارشناسان ما با شما
                هماهنگ می‌شود.
              </p>
            </div>

            <div className="rounded-2xl bg-surface-soft p-4 text-xs leading-6 text-ink-soft">
              پس از انتقال وجه، تصویر رسید پرداخت را از طریق واتساپ یا روبیکا برای ما ارسال کنید.
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={siteConfig.messengers.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border py-3 text-center text-sm font-medium text-ink transition-colors hover:border-gold"
              >
                ارسال رسید در واتساپ
              </a>
              <a
                href={siteConfig.messengers.rubika}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border py-3 text-center text-sm font-medium text-ink transition-colors hover:border-gold"
              >
                ارسال رسید در روبیکا
              </a>
            </div>

            <div className="mt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 rounded-full border border-border py-3.5 text-sm font-medium text-ink"
              >
                بازگشت
              </button>
              <button
                type="button"
                onClick={handleSubmitOrder}
                className="flex-1 rounded-full bg-ink py-3.5 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
              >
                ثبت سفارش
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  multiline,
  inputMode,
  dir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  multiline?: boolean;
  inputMode?: "numeric" | "text";
  dir?: "ltr" | "rtl";
}) {
  const commonProps = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    dir,
    inputMode,
    "aria-invalid": Boolean(error),
    className: `w-full rounded-xl border bg-surface px-4 py-3 text-sm outline-none transition-colors focus-visible:border-gold ${
      error ? "border-red" : "border-border"
    }`,
  };

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm text-ink">{label}</span>
      {multiline ? <textarea rows={3} {...commonProps} /> : <input type="text" {...commonProps} />}
      {error && <span className="text-xs text-red">{error}</span>}
    </label>
  );
}

function Row({
  label,
  value,
  copyable,
  onCopy,
  dir,
}: {
  label: string;
  value: string;
  copyable?: boolean;
  onCopy?: () => void;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="shrink-0 text-ink-soft">{label}</dt>
      <div className="flex items-center gap-2">
        <dd dir={dir} className="tnum text-ink">
          {toPersianDigits(value)}
        </dd>
        {copyable && (
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(value);
              onCopy?.();
            }}
            aria-label="کپی شماره کارت"
            className="flex h-7 w-7 items-center justify-center rounded-full text-ink-faint hover:bg-surface-soft hover:text-gold"
          >
            <Copy className="h-3.5 w-3.5" strokeWidth={1.75} />
          </button>
        )}
      </div>
    </div>
  );
}
