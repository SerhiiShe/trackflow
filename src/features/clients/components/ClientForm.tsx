import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateClient } from '../hooks/useCreateClient'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ClientFormProps } from '../types'

const clientSchema = z.object({
  name: z.string().min(2, 'The name must be at least 2 characters long.'),
  total_hours_limit: z.number({ message: 'Enter the number' }).min(1, 'Minimum 1 hour'),
})

type ClientFormValues = z.infer<typeof clientSchema>

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company name</label>
        <input
          {...register('name')}
          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Google"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Package of hours (per month)
        </label>
        <input
          {...register('total_hours_limit', { valueAsNumber: true })}
          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="10"
        />
        {errors.total_hours_limit && (
          <p className="text-red-500 text-sm mt-1">{errors.total_hours_limit.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="px-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? 'Please wait...' : 'Save'}
        </button>
      </div>
    </form>
  )
}
