import { createStore } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

export const defaultInitState = {
  avatar: "/images/Group 4.svg",
}

export function createAppStore(initState = defaultInitState) {
  return createStore()(persist(set => ({
    ...initState,
    // decrement: () => set((state) => ({ count: state.count - 1})),
    setAvatar: (url) => set(state => ({ avatar: url})),
    reset: () => set(defaultInitState)
  }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => sessionStorage)
    }
  ))
}
