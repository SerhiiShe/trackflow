import { supabase } from '../../../lib/supabaseClient'
import type { Client, CreateClientInput } from '../types'

export const getClients = async (): Promise<Client[]> => {
  const { data, error } = await supabase.from('clients').select('*').order('name')

  if (error) throw new Error(error.message)
  return data
}

export const createClient = async ({ name }: CreateClientInput) => {
  const { data, error } = await supabase.from('clients').insert([{ name }]).select().single()

  if (error) throw new Error(error.message)
  return data
}
