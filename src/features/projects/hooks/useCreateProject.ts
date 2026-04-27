import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProject } from '../services/projectService'

export const useCreateProject = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })

      if (onSuccessCallback) {
        onSuccessCallback()
      }
    },
  })
}
