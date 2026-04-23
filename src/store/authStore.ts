import { create } from 'zustand'
import { type User, type Session } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  session: Session | null
  isInitialized: boolean
  setAuth: (session: Session | null) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isInitialized: false,
  setAuth: (session) =>
    set({
      session,
      user: session?.user ?? null,
      isInitialized: true,
    }),
  clearAuth: () => set({
    user: null,
    session: null,
    isInitialized: true,
  }),
}))
