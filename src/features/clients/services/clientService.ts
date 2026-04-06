import { supabase } from '../../../lib/supabaseClient'
import type { Client } from '../types'

export const getClients = async (): Promise<Client[]> => {
  const { data, error } = await supabase.from('clients').select('*')
  if (error) throw new Error(error.message)
  return data
}
