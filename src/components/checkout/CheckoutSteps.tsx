import { Check } from "lucide-react";

const steps = ["اطلاعات مشتری", "روش پرداخت", "پرداخت و ثبت سفارش"];

export default function CheckoutSteps({ current }: { current: number }) {
  return (
    <ol className="mb-10 flex items-center">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const done = stepNum < current;
        const active = stepNum === current;
        return (
          <li key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2.5">
              <span
                className={`tnum flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                  done
                    ? "bg-ink text-white"
                    : active
                      ? "border-2 border-ink text-ink"
                      : "border border-border text-ink-faint"
                }`}
              >
                {done ? <Check className="h-4 w-4" strokeWidth={2} /> : (i + 1).toLocaleString("fa-IR")}
              </span>
              <span
                className={`hidden text-sm sm:inline ${active || done ? "text-ink" : "text-ink-faint"}`}
              >
                {label}
              </span>
            </div>
            {stepNum !== steps.length && (
              <div className={`mx-3 h-px flex-1 ${done ? "bg-ink" : "bg-border"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
