import { useMutation, useQueryClient } from '@tanstack/react-query'
import { archiveClient } from '../services/clientService'

export const useArchiveClient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: archiveClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}
