import { useState } from 'react'
import { ProjectList } from '../features/projects/components/ProjectList'
import { ProjectForm } from '../features/projects/components/ProjectForm'
import { TaskForm } from '../features/tasks/components/TaskForm'
import type { Project } from '../features/projects/types'

export const ProjectsPage = () => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [taskLogProjectId, setTaskLogProjectId] = useState<string | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  return (
    <main className="container mx-auto py-10 px-4">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 pb-1">Projects</h1>
          <p className="text-gray-500">Projects and hours management.</p>
        </div>

        <button
          onClick={() => setIsProjectModalOpen(true)}
          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + New project
        </button>
      </header>

      <ProjectList onLogTimeClick={(id) => setTaskLogProjectId(id)} onEditClick={(project) => setEditingProject(project)} />

      {taskLogProjectId && (
        <div
          onMouseDown={(e) => e.target === e.currentTarget && setTaskLogProjectId(null)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-bold mb-4">Add a new task</h2>

            <TaskForm
              projectId={taskLogProjectId}
              onSuccess={() => setTaskLogProjectId(null)}
              onCancel={() => setTaskLogProjectId(null)}
            />
          </div>
        </div>
      )}

      {isProjectModalOpen && (
        <div
          onMouseDown={(e) => e.target === e.currentTarget && setIsProjectModalOpen(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-bold mb-4">Add a new project</h2>

            <ProjectForm
              onSuccess={() => setIsProjectModalOpen(false)}
              onCancel={() => setIsProjectModalOpen(false)}
            />
          </div>
        </div>
      )}

      {editingProject && (
        <div
          onMouseDown={(e) => e.target === e.currentTarget && setEditingProject(null)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-bold mb-4">Edit the project</h2>

            <ProjectForm
              projectId={editingProject.id}
              initialData={{
                name: editingProject.name,
                client_id: editingProject.clients?.id || '',
                total_hours_limit: editingProject.total_seconds_limit / 3600,
              }}
              onSuccess={() => setEditingProject(null)}
              onCancel={() => setEditingProject(null)}
            />
          </div>
        </div>
      )}
    </main>
  )
}
