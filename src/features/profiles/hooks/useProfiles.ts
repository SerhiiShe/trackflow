import { useQuery } from '@tanstack/react-query'
import { getProfiles } from '../services/profileService'

export const useProfiles = () => {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: getProfiles,
  })
}
