import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateProject } from '../hooks/useCreateProject'
import { zodResolver } from '@hookform/resolvers/zod'
import { useClients } from '../../clients/hooks/useClients'
import type { CreateProjectInput, Project } from '../types'
import { useUpdateProject } from '../hooks/useUpdateProject'
import { useState } from 'react'
import { ClientForm } from '../../clients/components/ClientForm'
import { useArchiveProject } from '../hooks/useArchiveProject'

const projectSchema = z.object({
  name: z.string().min(2, 'The name must be at least 2 characters long'),
  total_hours_limit: z.number({ message: 'Enter the number' }).min(1, 'Minimum 1 hour'),
  client_id: z.uuid('Select a client'),
  status: z.enum(['Ongoing', 'Finished']),
})

type ProjectFormValues = z.infer<typeof projectSchema>

interface ProjectFormProps {
  project?: Project
  initialData?: CreateProjectInput
  onSuccess: () => void
  onCancel: () => void
}

export const ProjectForm = ({ project, initialData, onSuccess, onCancel }: ProjectFormProps) => {
  const { mutate: createProject, isPending: isCreating } = useCreateProject(onSuccess)
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject(onSuccess)
  const { data: clients, isLoading: isLoadingClients } = useClients()

  const { mutate: archiveProject, isPending: isArchiving } = useArchiveProject()

  const [isClientModalOpen, setIsClientModalOpen] = useState(false)

  const isEditMode = !!project

  const handleArchive = (id: string, name: string) => {
    if (window.confirm(`Move project "${name}" to archive?`)) {
      archiveProject(id)
      onCancel()
    }
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {
      name: '',
      client_id: '',
      total_hours_limit: 0,
      status: 'Ongoing',
    },
  })

  const handleClientCreated = (newClient: any) => {
    setIsClientModalOpen(false)
    if (newClient) {
      setTimeout(() => {
        setValue('client_id', newClient.id, {
          shouldValidate: true,
          shouldDirty: true,
        })
      }, 100)
    }
  }

  const onSubmit = (data: ProjectFormValues) => {
    if (isEditMode) {
      updateProject({ projectId: project.id, data })
    } else {
      createProject(data)
    }
  }

  return (
    <div className="relative">
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
          <div className="flex gap-2">
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
            <button
              type="button"
              onClick={() => setIsClientModalOpen(true)}
              className="cursor-pointer px-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              title="Add a new client"
            >
              +
            </button>
          </div>
          {errors.client_id && (
            <p className="text-red-500 text-sm mt-1">{errors.client_id.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select {...register('status')} className="w-full p-2 border rounded bg-white">
            <option value="Ongoing">Ongoing</option>
            <option value="Finished">Finished</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
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
          {isEditMode && (
            <button
              onClick={() => handleArchive(project.id, project.name)}
              disabled={isArchiving}
              className="cursor-pointer w-6 text-gray-400 hover:text-orange-500 mr-auto"
              title="Archive"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <path
                    d="M9 12C9 11.5341 9 11.3011 9.07612 11.1173C9.17761 10.8723 9.37229 10.6776 9.61732 10.5761C9.80109 10.5 10.0341 10.5 10.5 10.5H13.5C13.9659 10.5 14.1989 10.5 14.3827 10.5761C14.6277 10.6776 14.8224 10.8723 14.9239 11.1173C15 11.3011 15 11.5341 15 12C15 12.4659 15 12.6989 14.9239 12.8827C14.8224 13.1277 14.6277 13.3224 14.3827 13.4239C14.1989 13.5 13.9659 13.5 13.5 13.5H10.5C10.0341 13.5 9.80109 13.5 9.61732 13.4239C9.37229 13.3224 9.17761 13.1277 9.07612 12.8827C9 12.6989 9 12.4659 9 12Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                  ></path>{' '}
                  <path
                    d="M20.5 7V13C20.5 16.7712 20.5 18.6569 19.3284 19.8284C18.1569 21 16.2712 21 12.5 21H11.5M3.5 7V13C3.5 16.7712 3.5 18.6569 4.67157 19.8284C5.37634 20.5332 6.3395 20.814 7.81608 20.9259"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{' '}
                  <path
                    d="M12 3H4C3.05719 3 2.58579 3 2.29289 3.29289C2 3.58579 2 4.05719 2 5C2 5.94281 2 6.41421 2.29289 6.70711C2.58579 7 3.05719 7 4 7H20C20.9428 7 21.4142 7 21.7071 6.70711C22 6.41421 22 5.94281 22 5C22 4.05719 22 3.58579 21.7071 3.29289C21.4142 3 20.9428 3 20 3H16"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
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

      {isClientModalOpen && (
        <div
          onMouseDown={(e) => e.target === e.currentTarget && setIsClientModalOpen(false)}
          className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-lg font-bold mb-4">Add a new client</h3>
            <ClientForm
              onSuccess={handleClientCreated}
              onCancel={() => setIsClientModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
