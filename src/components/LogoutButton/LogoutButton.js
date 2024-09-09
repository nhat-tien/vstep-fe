"use client"
import { logout } from "@/services/auth"

export default function LogoutButton({children, ...props}) {
  
  return (
  <button
    onClick={e => logout({})}
    {...props}
  >
      {children}
  </button>
  )
}
