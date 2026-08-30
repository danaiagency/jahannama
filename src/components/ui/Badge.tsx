import type { ReactNode } from "react";

type BadgeTone = "gold" | "red" | "green" | "amber" | "ink";

const toneClasses: Record<BadgeTone, string> = {
  gold: "bg-gold-tint text-gold-dark",
  red: "bg-red-tint text-red",
  green: "bg-green-tint text-green",
  amber: "bg-amber-tint text-amber",
  ink: "bg-ink text-white",
};

export default function Badge({
  children,
  tone = "gold",
  className = "",
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium tnum ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
