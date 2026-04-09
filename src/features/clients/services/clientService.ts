import { supabase } from '../../../lib/supabaseClient'
import type { Client } from '../types'

export const getClients = async (): Promise<Client[]> => {
  const { data, error } = await supabase.from('clients').select('*')
  if (error) throw new Error(error.message)
  return data
}

export const createClient = async (clientData: {
  name: string
  total_hours_limit: number
}): Promise<Client> => {
  const { data, error } = await supabase
    .from('clients')
    .insert([{
      name: clientData.name,
      total_hours_limit: clientData.total_hours_limit,
      remaining_hours: clientData.total_hours_limit,
    }])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}
