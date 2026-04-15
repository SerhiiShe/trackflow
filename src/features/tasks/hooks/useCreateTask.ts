import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logTask } from '../services/taskService'

export const useCreateTask = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      queryClient.invalidateQueries({ queryKey: ['task_logs'] })

      if (onSuccessCallback) {
        onSuccessCallback()
      }
    },
  })
}
