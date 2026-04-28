import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createClient } from "../services/clientService"

export const useCreateClient = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })

      if (onSuccessCallback) {
        onSuccessCallback()
      }
    }
  })
}