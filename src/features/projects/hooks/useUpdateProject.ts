import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProject } from '../services/projectService'
import type { CreateProjectInput } from '../types'

export const useUpdateProject = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ projectId, data }: { projectId: string; data: CreateProjectInput }) =>
      updateProject(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })

      if (onSuccessCallback) {
        onSuccessCallback()
      }
    },
  })
}
