import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionTo,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-soft">
        <Icon className="h-6 w-6 text-ink-faint" strokeWidth={1.5} />
      </div>
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      <p className="max-w-xs text-sm leading-6 text-ink-soft">{description}</p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-2 inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
