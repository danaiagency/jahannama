import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { useCartTotals } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { toPersianDigits } from "@/utils/format";
import { products } from "@/data/products";
import LazyImage from "@/components/ui/LazyImage";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";

const navLinks = [
  { to: "/", label: "خانه" },
  { to: "/shop", label: "فروشگاه" },
  { to: "/about", label: "درباره ما" },
  { to: "/contact", label: "تماس با ما" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { count } = useCartTotals();
  const wishlistCount = useWishlistStore((s) => s.productIds.length);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const suggestions =
    query.trim().length > 0
      ? products.filter((p) => p.title.includes(query.trim())).slice(0, 4)
      : [];

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
    setQuery("");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="باز کردن منو"
        >
          <Menu className="h-5.5 w-5.5" strokeWidth={1.75} />
        </button>

        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive ? "font-medium text-ink" : "text-ink-soft hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <div className="relative" ref={searchRef}>
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="جستجو"
              aria-expanded={searchOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-soft"
            >
              <Search className="h-5 w-5" strokeWidth={1.75} />
            </button>

            {searchOpen && (
              <div className="absolute left-0 top-12 w-[min(90vw,22rem)] rounded-2xl border border-border bg-surface p-3 shadow-lift">
                <form onSubmit={submitSearch} className="flex items-center gap-2">
                  <input
                    autoFocus
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="جستجوی محصول..."
                    className="w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm outline-none focus-visible:border-gold"
                  />
                </form>
                {suggestions.length > 0 && (
                  <ul className="mt-2 flex flex-col gap-1">
                    {suggestions.map((p) => (
                      <li key={p.id}>
                        <Link
                          to={`/product/${p.slug}`}
                          onClick={() => {
                            setSearchOpen(false);
                            setQuery("");
                          }}
                          className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-surface-soft"
                        >
                          <LazyImage
                            src={p.images[0]}
                            alt={p.title}
                            ratio="aspect-square"
                            className="w-10 shrink-0 rounded-lg"
                          />
                          <span className="truncate text-sm text-ink">{p.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <Link
            to="/wishlist"
            aria-label="علاقه‌مندی‌ها"
            className="relative hidden h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-soft sm:flex"
          >
            <Heart className="h-5 w-5" strokeWidth={1.75} />
            {wishlistCount > 0 && (
              <span className="tnum absolute -left-0.5 -top-0.5 flex h-4.5 min-w-[1.125rem] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-white">
                {toPersianDigits(wishlistCount)}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            aria-label="سبد خرید"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-soft"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
            {count > 0 && (
              <span className="tnum absolute -left-0.5 -top-0.5 flex h-4.5 min-w-[1.125rem] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-white">
                {toPersianDigits(count)}
              </span>
            )}
          </Link>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </header>
  );
}
