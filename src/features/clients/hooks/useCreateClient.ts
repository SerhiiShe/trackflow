import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '../services/clientService'

export const useCreateClient = (onSuccessCallback?: (newClient: any) => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createClient,
    onSuccess: (data) => {
      queryClient.setQueryData(['clients'], (oldClients: any[] | undefined) => {
        if (!oldClients) return [data]
        return [...oldClients, data]
      })

      queryClient.invalidateQueries({ queryKey: ['clients'] })

      if (onSuccessCallback) {
        onSuccessCallback(data)
      }
    },
  })
}
