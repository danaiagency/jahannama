import { create } from "zustand";

export interface ToastMessage {
  id: number;
  text: string;
  tone: "success" | "info";
}

interface ToastState {
  toasts: ToastMessage[];
  show: (text: string, tone?: ToastMessage["tone"]) => void;
  dismiss: (id: number) => void;
}

let counter = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  show: (text, tone = "success") =>
    set((state) => {
      const id = ++counter;
      setTimeout(() => {
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
      }, 2800);
      return { toasts: [...state.toasts, { id, text, tone }] };
    }),
  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
