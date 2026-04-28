import { useQuery } from '@tanstack/react-query'
import { getClients } from '../services/clientService'

export const useClient = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  })
}
