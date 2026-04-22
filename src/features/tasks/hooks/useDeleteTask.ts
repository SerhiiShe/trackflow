import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTaskLog } from "../services/taskService"

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTaskLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task_logs'] })
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    }
  })
}