// src/store/useUserStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface UserStore {
  user: User | null
  token: string | null
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  logout: () => void
  isAuthenticated: () => boolean
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      
      setUser: (user) => set({ user }),
      
      setToken: (token) => {
        set({ token })
        if (token) {
          localStorage.setItem('token', token)
        } else {
          localStorage.removeItem('token')
        }
      },
      
      logout: () => {
        set({ user: null, token: null })
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      },
      
      isAuthenticated: () => !!get().token && !!get().user,
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
)