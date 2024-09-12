import { createStore } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

export const defaultInitState = {
  count: 0
}

export function createCounterStore(initState = defaultInitState) {
  return createStore()(persist(set => ({
    ...initState,
    increment: () => set((state) => ({ count: state.count + 1})),
    decrement: () => set((state) => ({ count: state.count - 1})),
    reset: () => set(defaultInitState)
  }),
    {
      name: "exam-storage",
      storage: createJSONStorage(() => localStorage)
    }
  ))
}
