"use client"

import { type ReactNode, useEffect } from "react"
import { useAuthStore } from "@/store/authStore"

export function AuthProvider({ children }: { children: ReactNode }) {
  const { initialize } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  return <>{children}</>
}
