import { useMutation, useQueryClient } from "@tanstack/react-query"
import { archiveProject } from "../services/projectService"

export const useArchiveProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: archiveProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    }
  })
}