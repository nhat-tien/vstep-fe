"use client"

import { createContext, useContext, useRef } from "react"
import { createAppStore } from "./app-store";
import { useStore } from "zustand";

export const AppStoreContext = createContext()

export const AppStoreProvider = ({ children }) => {
  const storeRef = useRef();

  if(!storeRef.current) {
    storeRef.current = createAppStore()
  }

  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  )
}

export const useAppStore = (selector) => {
  const appStoreContext = useContext(AppStoreContext)
  if(!appStoreContext) {
    throw new Error("You won't want to see me. I'm here because you use useCounterStore outside CounterStoreProvider");
  }

  return useStore(appStoreContext, selector)
}
