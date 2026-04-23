import { supabase } from '../../../lib/supabaseClient'
import type { LoginInput } from '../types'

export const login = async ({ email, password }: LoginInput) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) throw error
  return data
}

export const logout = () => {
  supabase.auth.signOut()
}
