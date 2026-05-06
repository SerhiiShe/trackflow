import { supabase } from '../../../lib/supabaseClient'
import type { CreateTaskInput, TaskFilters, TaskLog } from '../../tasks/types'

const PAGE_SIZE = 20

export const getTaskLogs = async ({
  pageParam = 0,
  search,
  projectId,
  clientId,
  userId,
  sortBy = 'date_desc',
}: TaskFilters) => {
  const from = pageParam * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from('task_logs')
    .select('*, projects!inner(name, client_id, clients(name)), profiles(full_name, email)', {
      count: 'exact',
    })

  if (userId) query = query.eq('user_id', userId)
  if (projectId) query = query.eq('project_id', projectId)
  if (clientId) query = query.eq('projects.client_id', clientId)
  if (search) query = query.eq('title', `%${search}%`)

  switch (sortBy) {
    case 'date_asc': query = query.order('created_at', { ascending: true })
    break
    case 'time_desc': query = query.order('time_spent_seconds', { ascending: false })
    break
    case 'time_asc': query = query.order('time_spent_seconds', { ascending: true })
    break
    case 'date_desc':
    default: query = query.order('created_at', { ascending: false })
    break
  }

  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) throw new Error(error.message)
  return {
    data: data as unknown as TaskLog[],
    nextPage: data.length === PAGE_SIZE ? pageParam + 1 : undefined,
    totalCount: count
  }
}

export const logTask = async (input: CreateTaskInput) => {
  const totalSeconds = input.hours * 3600 + input.minutes * 60

  const { data, error } = await supabase
    .from('task_logs')
    .insert([
      {
        project_id: input.project_id,
        user_id: input.user_id,
        title: input.title,
        description: input.description,
        time_spent_seconds: totalSeconds,
      },
    ])
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export const deleteTaskLog = async (taskId: string) => {
  const { error } = await supabase.from('task_logs').delete().eq('id', taskId)

  if (error) throw new Error(error.message)
}

export const updateTaskLog = async (taskId: string, input: CreateTaskInput) => {
  const totalSeconds = input.hours * 3600 + input.minutes * 60

  const { data, error } = await supabase
    .from('task_logs')
    .update({
      project_id: input.project_id,
      user_id: input.user_id,
      title: input.title,
      description: input.description,
      time_spent_seconds: totalSeconds,
    })
    .eq('id', taskId)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}
