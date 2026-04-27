import { supabase } from '../../../lib/supabaseClient'
import type { CreateTaskInput, TaskLog } from '../../tasks/types'

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

export const getTaskLogs = async () => {
  const { data, error } = await supabase
    .from('task_logs')
    .select('*, projects(name), profiles(full_name, email)')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data as TaskLog[]
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
