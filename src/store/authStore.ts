import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/types"
import { loginUser, registerUser, getCurrentUser } from "@/lib/api"

interface AuthState {
  user: User | null
  token: string | null
  initialize: () => Promise<void>
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      initialize: async () => {
        try {
          const user = await getCurrentUser()
          if (user) {
            set({ user })
          }
        } catch (error) {
          set({ user: null, token: null })
        }
      },

      login: async (email, password) => {
        const { user, token } = await loginUser(email, password)
        set({ user, token })
      },

      register: async (name, email, password) => {
        await registerUser(name, email, password)
      },

      logout: () => {
        set({ user: null, token: null })
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token }),
    },
  ),
)
