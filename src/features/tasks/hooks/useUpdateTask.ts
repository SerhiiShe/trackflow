import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTaskLog } from '../services/taskService'
import type { CreateTaskInput } from '../types'

export const useUpdateTask = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: CreateTaskInput }) =>
      updateTaskLog(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task_logs'] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })

      if (onSuccessCallback) {
        onSuccessCallback()
      }
    },
  })
}
