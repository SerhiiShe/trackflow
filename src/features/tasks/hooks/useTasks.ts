import { useQuery } from '@tanstack/react-query'
import { getTaskLogs } from '../services/taskService'

export const useTasks = () => {
  return useQuery({
    queryKey: ['task_logs'],
    queryFn: getTaskLogs,
  })
}
