import { z } from 'zod'

export const ClientForm = () => {
  const clientSchema = {
    name: z.string().min(2, 'The name must be at least 2 characters long.'),
    total_hours_limit: z.number({ message: 'Enter the number' }).min(1, 'Minimum 1 hour'),
  }
}
