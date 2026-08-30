import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import FilterForm from "./FilterForm";
import type { ShopFilters } from "./filterTypes";

export default function FilterDrawer({
  open,
  onClose,
  filters,
  onChange,
  onClear,
  resultCount,
}: {
  open: boolean;
  onClose: () => void;
  filters: ShopFilters;
  onChange: (next: ShopFilters) => void;
  onClear: () => void;
  resultCount: number;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.28 }}
            className="fixed inset-x-0 bottom-0 z-[70] max-h-[85vh] overflow-y-auto rounded-t-3xl bg-surface p-5 shadow-lift"
            role="dialog"
            aria-modal="true"
            aria-label="فیلترها"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-semibold text-ink">فیلترها</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="بستن فیلترها"
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface-soft"
              >
                <X className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </div>

            <FilterForm filters={filters} onChange={onChange} onClear={onClear} />

            <button
              type="button"
              onClick={onClose}
              className="sticky bottom-0 mt-7 w-full rounded-full bg-ink py-3.5 text-sm font-medium text-white"
            >
              نمایش {resultCount.toLocaleString("fa-IR")} محصول
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
