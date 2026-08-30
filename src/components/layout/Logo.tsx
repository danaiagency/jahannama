export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2 select-none">
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill={dark ? "#FAF8F4" : "#211D19"} />
        <path
          d="M10 22 Q10 10 16 10 Q22 10 22 18"
          stroke="#B08D57"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="22" cy="21" r="1.7" fill="#B08D57" />
      </svg>
      <span
        className={`text-lg font-bold tracking-tight ${dark ? "text-white" : "text-ink"}`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        جهان‌نما
      </span>
    </span>
  );
}
