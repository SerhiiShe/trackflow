import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateTask } from '../hooks/useCreateTask'
import { useProfiles } from '../../profiles/hooks/useProfiles'
import { useAuthStore } from '../../auth/store/authStore'
import { useUpdateTask } from '../hooks/useUpdateTask'
import type { CreateTaskInput, TaskLog } from '../types'
import { useDeleteTask } from '../hooks/useDeleteTask'

const taskSchema = z
  .object({
    project_id: z.uuid('Select a project'),
    user_id: z.uuid('Select an assignee'),
    title: z.string().min(3, 'Write what was done'),
    description: z.string().optional(),
    hours: z.number().min(0),
    minutes: z.number().min(0).max(59, 'Maximum 59 minutes'),
    date: z.string().min(1, 'Select date'),
  })
  .refine((data) => data.hours > 0 || data.minutes > 0, {
    message: 'Time cannot be zero',
    path: ['hours'],
  })

type TaskFormValues = z.infer<typeof taskSchema>

export interface TaskFormProps {
  projectId: string
  task?: TaskLog
  initialData?: CreateTaskInput
  onSuccess: () => void
  onCancel: () => void
}

export const TaskForm = ({ projectId, task, initialData, onSuccess, onCancel }: TaskFormProps) => {
  const { mutate: createMutate, isPending: isCreating } = useCreateTask(onSuccess)
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateTask(onSuccess)
  const { data: profiles, isLoading: isLoadingProfiles } = useProfiles()
  const { user } = useAuthStore()

  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask()

  const isEditMode = !!task

  const handleDelete = (taskId: string) => {
    if (
      window.confirm(
        'Are you sure you want to delete this entry? The time will be returned to the project.',
      )
    ) {
      deleteTask(taskId)
      onCancel()
    }
  }

  const profilesForSelect = profiles?.filter((p) => p.role === 'employee')

  const today = new Date().toISOString().split('T')[0]

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialData || {
      project_id: projectId,
      user_id: user?.id,
      hours: 0,
      minutes: 0,
      date: today,
    },
  })

  const onSubmit = (data: TaskFormValues) => {
    if (isEditMode) {
      updateMutate({ taskId: task.id, data })
    } else {
      createMutate(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="">
        <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
        <select
          {...register('user_id')}
          className="w-full p-2 border rounded bg-white"
          disabled={isLoadingProfiles}
        >
          {profilesForSelect?.map((profile) => (
            <option key={profile.id} value={profile.id}>
              {profile.full_name || profile.email}
            </option>
          ))}
        </select>
        {errors.user_id && <p className="text-red-500 text-sm mt-1">{errors.user_id.message}</p>}
      </div>

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
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input
          type="date"
          {...register('date')}
          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
      </div>

      <div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
            <input
              type="number"
              {...register('hours', { valueAsNumber: true })}
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Minutes</label>
            <input
              type="number"
              {...register('minutes', { valueAsNumber: true })}
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        {errors.hours && <p className="text-red-500 text-sm mt-1">{errors.hours.message}</p>}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        {isEditMode && (
          <button
            onClick={() => handleDelete(task.id)}
            disabled={isDeleting}
            className="cursor-pointer w-6 text-gray-400 hover:text-red-500 mr-auto"
            title="Delete"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracurrentColorerCarrier"
                stroke-linecurrentcap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_icurrentColoronCarrier">
                {' '}
                <path
                  d="M20.5001 6H3.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecurrentcap="round"
                ></path>{' '}
                <path
                  d="M9.5 11L10 16"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecurrentcap="round"
                ></path>{' '}
                <path
                  d="M14.5 11L14 16"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecurrentcap="round"
                ></path>{' '}
                <path
                  d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                  stroke="currentColor"
                  stroke-width="1.5"
                ></path>{' '}
                <path
                  d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecurrentcap="round"
                ></path>{' '}
              </g>
            </svg>
          </button>
        )}

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
