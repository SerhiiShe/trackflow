import { useInfiniteQuery } from '@tanstack/react-query'
import { getTaskLogs } from '../services/taskService'
import type { TaskFilters } from '../types'

export const useTasks = (filters: Omit<TaskFilters, 'pageParam'>) => {
  return useInfiniteQuery({
    queryKey: ['task_logs', filters],
    queryFn: ({ pageParam }) => getTaskLogs({ ...filters, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })
}
