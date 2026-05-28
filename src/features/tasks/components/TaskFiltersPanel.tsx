import { useState } from 'react'
import { useClients } from '../../clients/hooks/useClients'
import { useProfiles } from '../../profiles/hooks/useProfiles'
import { useProjects } from '../../projects/hooks/useProjects'
import type { Project } from '../../projects/types'
import type { TaskFilters } from '../types'
import { useAuthStore } from '../../auth/store/authStore'

interface TaskFiltersPanelProps {
  filters: Omit<TaskFilters, 'pageParam'>
  onChange: (newFilters: Omit<TaskFilters, 'pageParam'>) => void
  onProjectChange: (project: Project | null) => void
}

export const TaskFiltersPanel = ({ filters, onChange, onProjectChange }: TaskFiltersPanelProps) => {
  const { data: projects } = useProjects()
  const { data: clients } = useClients()
  const { data: profiles } = useProfiles()
  const { user } = useAuthStore()

    const currentProfile = profiles?.find((p) => p.id === user?.id)
    const isEmployee = currentProfile?.role === 'employee'

  const [showFinishedProjects, setShowFinishedProjects] = useState(false)

  const projectsForSelect = projects?.filter((p) =>
    showFinishedProjects ? true : p.status !== 'Finished'
  )

  const profilesForSelect = profiles?.filter((p) =>
    p.role === 'employee'
  )

  const handleChange = (key: keyof typeof filters, value: string) => {
    onChange({ ...filters, [key]: value === 'all' ? undefined : value })
  }

  const handleProjectChange = (projectId: string) => {
    handleChange('projectId', projectId)
    const project = projectId === 'all' ? null : projects?.find((p) => p.id === projectId) || null
    onProjectChange(project)
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-1">
          <label className="block text-xs font-medium text-gray-500 mb-1">Search</label>
          <input
            type="text"
            placeholder="Task name..."
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            className="w-full p-2 text-sm border rounded bg-gray-50 focus:bg-white focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Client</label>
          <select
            value={filters.clientId || 'all'}
            onChange={(e) => handleChange('clientId', e.target.value)}
            disabled={!isEmployee}
            className="w-full p-2 text-sm border rounded bg-gray-50 disabled:opacity-40"
          >
            <option value="all">{isEmployee ? 'All clients' : currentProfile?.full_name}</option>
            {clients?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Project</label>
          <select
            value={filters.projectId || 'all'}
            onChange={(e) => handleProjectChange(e.target.value)}
            className="w-full p-2 text-sm border rounded bg-gray-50"
          >
            <option value="all">All projects</option>
            {projectsForSelect?.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Assignee</label>
          <select
            value={filters.userId || 'all'}
            onChange={(e) => handleChange('userId', e.target.value)}
            className="w-full p-2 text-sm border rounded bg-gray-50"
          >
            <option value="all">All users</option>
            {profilesForSelect?.map((p) => (
              <option key={p.id} value={p.id}>
                {p.full_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Sort</label>
          <select
            value={filters.sortBy || 'date_desc'}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="w-full p-2 text-sm border rounded bg-gray-50"
          >
            <option value="date_desc">Newest first</option>
            <option value="date_asc">Oldest first</option>
            <option value="time_desc">More time</option>
            <option value="time_asc">Less time</option>
          </select>
        </div>
      </div>
      <div className="flex items-center border-t border-gray-300 pt-2 mt-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showFinishedProjects}
            onChange={(e) => setShowFinishedProjects(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">Show finished projects in the filter</span>
        </label>
      </div>
    </div>
  )
}
