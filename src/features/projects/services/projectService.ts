import { supabase } from '../../../lib/supabaseClient'
import type { Project, CreateProjectInput } from '../types'

const SECONDS_IN_HOUR = 3600

export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*, clients(name)')
    .eq('is_archived', false)
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data || []
}

export const createProject = async (input: CreateProjectInput): Promise<Project> => {
  const secondsLimit = input.total_hours_limit * SECONDS_IN_HOUR

  const { data, error } = await supabase
    .from('projects')
    .insert([
      {
        name: input.name,
        total_seconds_limit: secondsLimit,
        remaining_seconds: secondsLimit,
        client_id: input.client_id,
      },
    ])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export const archiveProject = async (projectId: string): Promise<void> => {
  const { error } = await supabase
    .from('projects')
    .update({ is_archived: true })
    .eq('id', projectId)

  if (error) throw new Error(error.message)
}
