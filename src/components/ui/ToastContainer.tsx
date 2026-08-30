import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info } from "lucide-react";
import { useToastStore } from "@/store/toast";

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div
      className="fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-6"
      aria-live="polite"
      role="status"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 rounded-xl border border-border bg-ink px-4 py-3 text-sm text-white shadow-lift"
          >
            {toast.tone === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-light" />
            ) : (
              <Info className="h-4 w-4 shrink-0 text-gold-light" />
            )}
            <span>{toast.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
