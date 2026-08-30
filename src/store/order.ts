import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order } from "@/types";

interface OrderState {
  lastOrder: Order | null;
  setLastOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      lastOrder: null,
      setLastOrder: (order) => set({ lastOrder: order }),
    }),
    { name: "jahannama-last-order" }
  )
);
