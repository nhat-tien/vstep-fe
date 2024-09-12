"use client"

import { createContext, useContext, useRef } from "react"
import { createCounterStore } from "./counter-store";
import { useStore } from "zustand";

export const CounterStoreContext = createContext()

export const CounterStoreProvider = ({ children }) => {
  const storeRef = useRef();

  if(!storeRef.current) {
    storeRef.current = createCounterStore()
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  )
}

export const useCounterStore = (selector) => {
  const counterStoreContext = useContext(CounterStoreContext)
  if(!counterStoreContext) {
    throw new Error("You won't want to see me. I'm here because you use useCounterStore outside CounterStoreProvider");
  }

  return useStore(counterStoreContext, selector)
}
