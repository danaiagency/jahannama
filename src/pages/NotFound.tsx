import { Link } from "react-router-dom";
import { CompassIcon } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <title>صفحه پیدا نشد | مبلمان جهان‌نما</title>

      <div className="container-page flex flex-col items-center py-24 text-center">
        <CompassIcon className="h-10 w-10 text-ink-faint" strokeWidth={1.5} />
        <h1 className="mt-5 text-2xl font-bold text-ink">صفحه مورد نظر پیدا نشد</h1>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">
          ممکن است آدرس اشتباه باشد یا این صفحه جابه‌جا شده باشد.
        </p>
        <Link
          to="/"
          className="mt-7 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
        >
          بازگشت به خانه
        </Link>
      </div>
    </>
  );
}
