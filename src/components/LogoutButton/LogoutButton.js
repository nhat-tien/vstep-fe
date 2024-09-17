"use client"
import { logout } from "@/services/auth"
import { useAppStore } from "@/stores/app-store-provider"

export default function LogoutButton({children, ...props}) {
  const reset = useAppStore(state => state.reset);
  
  return (
  <button
    onClick={e => {
      reset()
      logout({})
    }}
    {...props}
  >
      {children}
  </button>
  )
}
