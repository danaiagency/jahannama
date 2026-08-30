import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { categories } from "@/data/categories";
import Logo from "./Logo";

interface Props {
  open: boolean;
  onClose: () => void;
  links: { to: string; label: string }[];
}

export default function MobileMenu({ open, onClose, links }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/40 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-[82vw] max-w-sm flex-col bg-surface p-5 shadow-lift lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="منوی ناوبری"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                aria-label="بستن منو"
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface-soft"
              >
                <X className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-3 text-[15px] ${
                      isActive ? "bg-surface-soft font-medium text-ink" : "text-ink-soft"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-6 border-t border-border pt-6">
              <p className="mb-2 px-3 text-xs font-medium text-ink-faint">دسته‌بندی‌ها</p>
              <div className="flex flex-col gap-1">
                {categories.map((c) => (
                  <NavLink
                    key={c.slug}
                    to={`/shop?category=${c.slug}`}
                    onClick={onClose}
                    className="rounded-xl px-3 py-2.5 text-sm text-ink-soft hover:bg-surface-soft"
                  >
                    {c.title}
                  </NavLink>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
