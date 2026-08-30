import { Minus, Plus } from "lucide-react";
import { toPersianDigits } from "@/utils/format";

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-border p-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="کاهش تعداد"
        className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-soft disabled:opacity-30"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
      <span className="tnum w-6 text-center text-sm font-medium text-ink">
        {toPersianDigits(value)}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="افزایش تعداد"
        className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-soft disabled:opacity-30"
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
    </div>
  );
}
