import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateClient } from '../services/clientService'
import type { CreateClientInput } from '../types'

export const useUpdateClient = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ clientId, data }: { clientId: string; data: CreateClientInput }) =>
      updateClient(clientId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      queryClient.invalidateQueries({ queryKey: ['projects'] })

      if (onSuccessCallback) {
        onSuccessCallback()
      }
    },
  })
}
