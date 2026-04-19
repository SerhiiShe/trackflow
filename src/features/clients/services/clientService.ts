import { supabase } from '../../../lib/supabaseClient'
import type { Client } from '../types'

const SECONDS_IN_HOUR = 3600

export const getClients = async (): Promise<Client[]> => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data || []
}

export const createClient = async (input: {
  name: string
  total_hours_limit: number
}): Promise<Client> => {
  const secondsLimit = input.total_hours_limit * SECONDS_IN_HOUR

  const { data, error } = await supabase
    .from('clients')
    .insert([
      {
        name: input.name,
        total_seconds_limit: secondsLimit,
        remaining_seconds: secondsLimit,
      },
    ])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}
