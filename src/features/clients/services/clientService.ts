import { supabase } from '../../../lib/supabaseClient'
import type { Client, CreateClientInput } from '../types'

export const getClients = async (): Promise<Client[]> => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('is_archived', false)
    .order('name')

  if (error) throw new Error(error.message)
  return data
}

export const createClient = async ({ name }: CreateClientInput) => {
  const { data, error } = await supabase.from('clients').insert([{ name }]).select().single()

  if (error) throw new Error(error.message)
  return data
}

export const archiveClient = async (clientId: string): Promise<void> => {
  const { error } = await supabase
    .from('clients')
    .update({
      is_archived: true,
    })
    .eq('id', clientId)

  if (error) throw new Error(error.message)
}

export const updateClient = async (clientId: string, input: CreateClientInput) => {
  const { data, error } = await supabase
    .from('clients')
    .update({
      name: input.name,
    })
    .eq('id', clientId)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}
