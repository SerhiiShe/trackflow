import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateTask } from '../hooks/useCreateTask'

const taskSchema = z
  .object({
    client_id: z.uuid('Select a client'),
    title: z.string().min(3, 'Write what was done'),
    description: z.string().optional(),
    hours: z.number().min(0),
    minutes: z.number().min(0).max(59, 'Maximum 59 minutes'),
  })
  .refine((data) => data.hours > 0 || data.minutes > 0, {
    message: 'Time cannot be zero',
    path: ['hours'],
  })

type TaskFormValues = z.infer<typeof taskSchema>

export interface TaskFormProps {
  clientId: string
  onSuccess: () => void
  onCancel: () => void
}

export const TaskForm = ({ clientId, onSuccess, onCancel }: TaskFormProps) => {
  const { mutate, isPending } = useCreateTask(onSuccess)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      client_id: clientId,
      hours: 0,
      minutes: 0,
    },
  })

  const onSubmit = (data: TaskFormValues) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Task name</label>
        <input
          {...register('title')}
          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Bug fixing"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          {...register('description')}
          rows={2}
          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="Link bug in the navbar menu"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
            <input
              type="number"
              {...(register('hours', { valueAsNumber: true }))}
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Minutes</label>
            <input
              type="number"
              {...(register('minutes', { valueAsNumber: true }))}
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        {errors.hours && <p className="text-red-500 text-sm mt-1">{errors.hours.message}</p>}
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
