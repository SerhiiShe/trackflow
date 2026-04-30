import { useQuery } from '@tanstack/react-query'
import { getClients } from '../services/clientService'

export const useClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  })
}
