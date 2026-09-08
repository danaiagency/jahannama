import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCartStore, useCartTotals } from "@/store/cart";
import { useOrderStore } from "@/store/order";
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
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<CustomerInfo>(emptyCustomer);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});

  if (items.length === 0) return <Navigate to="/cart" replace />;

  function validate() {
    const next: typeof errors = {};
    if (!customer.fullName.trim()) next.fullName = "نام و نام خانوادگی را وارد کنید.";
    if (!/^0?9\d{9}$/.test(customer.phone.trim())) next.phone = "شماره موبایل معتبر وارد کنید.";
    if (!customer.address.trim()) next.address = "آدرس را وارد کنید.";
    if (!/^\d{10}$/.test(customer.postalCode.trim())) next.postalCode = "کد پستی ۱۰ رقمی وارد کنید.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmitOrder() {
    if (!validate()) return;
    const order = {
      orderNumber: generateOrderNumber(),
      status: "submitted" as const,
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
      <title>تکمیل درخواست | مبلمان جهان‌نما</title>

      <div className="container-page max-w-2xl py-8 md:py-12">
        <h1 className="mb-2 text-2xl font-bold text-ink md:text-3xl">تکمیل درخواست سفارش</h1>
        <p className="mb-8 text-sm leading-7 text-ink-soft">
          اطلاعات زیر را وارد کنید تا درخواست سفارش شما آماده ارسال به کارشناس فروش شود. قیمت
          نهایی و روش پرداخت در همان مکالمه با شما هماهنگ خواهد شد.
        </p>

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
            onClick={handleSubmitOrder}
            className="mt-2 rounded-full bg-ink py-3.5 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
          >
            ثبت درخواست و آماده‌سازی ارسال
          </button>
        </div>
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
