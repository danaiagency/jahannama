import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaTo,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaTo?: string;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && (
          <span className="text-xs font-medium tracking-wide text-gold">{eyebrow}</span>
        )}
        <h2 className="mt-1 text-2xl font-bold text-ink md:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-lg text-sm text-ink-soft">{description}</p>}
      </div>
      {ctaLabel && ctaTo && (
        <Link
          to={ctaTo}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-gold"
        >
          {ctaLabel}
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.75} />
        </Link>
      )}
    </div>
  );
}
