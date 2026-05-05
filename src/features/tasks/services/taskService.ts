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


  // const { data, error } = await supabase
  //   .from('task_logs')
  //   .select('*, projects(name, clients(name)), profiles(full_name, email)')
  //   .order('created_at', { ascending: false })

  // if (error) throw new Error(error.message)
  // return data as TaskLog[]
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
