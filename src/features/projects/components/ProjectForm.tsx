import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateProject } from '../hooks/useCreateProject'
import { zodResolver } from '@hookform/resolvers/zod'
import { useClients } from '../../clients/hooks/useClients'

const projectSchema = z.object({
  name: z.string().min(2, 'The name must be at least 2 characters long'),
  total_hours_limit: z.number({ message: 'Enter the number' }).min(1, 'Minimum 1 hour'),
  client_id: z.uuid('Select a client'),
})

type ProjectFormValues = z.infer<typeof projectSchema>

interface ProjectFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export const ProjectForm = ({ onSuccess, onCancel }: ProjectFormProps) => {
  const { mutate, isPending } = useCreateProject(onSuccess)
  const { data: clients, isLoading: isLoadingClients } = useClients()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({ resolver: zodResolver(projectSchema) })

  const onSubmit = (data: ProjectFormValues) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Project name</label>
        <input
          {...register('name')}
          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Page layout"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
        <select
          {...register('client_id')}
          className="w-full p-2 border rounded bg-white"
          disabled={isLoadingClients}
        >
          <option value="">Select a client...</option>
          {clients?.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        {errors.client_id && (
          <p className="text-red-500 text-sm mt-1">{errors.client_id.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
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
          className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer px-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? 'Please wait...' : 'Save'}
        </button>
      </div>
    </form>
  )
}
