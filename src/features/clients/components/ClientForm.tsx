import { z } from 'zod'
import { useCreateClient } from '../hooks/useCreateClient'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const clientSchema = z.object({
  name: z.string().min(2, 'The name must be at least 2 characters long'),
})

type ClientFormValues = z.infer<typeof clientSchema>

interface ClientFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export const ClientForm = ({ onSuccess, onCancel }: ClientFormProps) => {
  const { mutate, isPending } = useCreateClient(onSuccess)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormValues>({ resolver: zodResolver(clientSchema) })

  const onSubmit = (data: ClientFormValues) => {
    mutate(data)
  }

  return (
    
  )
}
