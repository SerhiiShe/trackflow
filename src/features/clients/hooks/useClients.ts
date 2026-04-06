import { useQuery } from '@tanstack/react-query'
import { getClients } from '../services/clientService'

export const useClients = () => {
  useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  })
}
