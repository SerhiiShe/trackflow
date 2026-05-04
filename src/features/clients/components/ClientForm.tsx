import { z } from 'zod'
import { useCreateClient } from '../hooks/useCreateClient'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { CreateClientInput } from '../types'
import { useUpdateClient } from '../hooks/useUpdateClient'

const clientSchema = z.object({
  name: z.string().min(2, 'The name must be at least 2 characters long'),
})

type ClientFormValues = z.infer<typeof clientSchema>

interface ClientFormProps {
  clientId?: string
  initialData?: CreateClientInput
  onSuccess: () => void
  onCancel: () => void
}

export const ClientForm = ({ clientId, initialData, onSuccess, onCancel }: ClientFormProps) => {
  const { mutate: createClient, isPending: isCreating } = useCreateClient(onSuccess)
  const { mutate: updateClient, isPending: isUpdating } = useUpdateClient(onSuccess)

  const isEditMode = !!clientId

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: initialData || { name: '' },
  })

  const onSubmit = (data: ClientFormValues) => {
    if (isEditMode) {
      updateClient({ clientId, data })
    } else {
      createClient(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Client name</label>
        <input
          {...register('name')}
          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Google"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isCreating || isUpdating}
          className="cursor-pointer px-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isCreating || isUpdating ? 'Please wait...' : 'Save'}
        </button>
      </div>
    </form>
  )
}
