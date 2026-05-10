import { supabase } from '../../../lib/supabaseClient'
import type { Profile } from '../types'

export const getProfiles = async (): Promise<Profile[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, full_name')
    .order('full_name', { ascending: true })

  if (error) throw new Error(error.message)
  return data
}
