import { useEffect, useState } from 'react'
import { TaskForm } from '../features/tasks/components/TaskForm'
import { TaskHistoryTable } from '../features/tasks/components/TaskHistoryTable'
import type { TaskFilters, TaskLog } from '../features/tasks/types'
import { useTasks } from '../features/tasks/hooks/useTasks'
import { TaskFiltersPanel } from '../features/tasks/components/TaskFiltersPanel'

export const TaskHistoryPage = () => {
  const [editingTask, setEditingTask] = useState<TaskLog | null>(null)

  const [filters, setFilters] = useState<Omit<TaskFilters, 'pageParam'>>({
    sortBy: 'date_desc',
  })

  const [debouncedFilters, setDebouncedFilters] = useState(filters)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedFilters(filters), 500)
    return () => clearTimeout(timer)
  }, [filters])

  const { data, isLoading, error, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useTasks(debouncedFilters)

  const tasks = data?.pages.flatMap((page) => page.data || [])

  return (
    <main className="container mx-auto py-10 px-4">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 pb-1">History</h1>
          <p className="text-gray-500">All completed tasks and time spent.</p>
        </div>
      </header>

      <TaskFiltersPanel filters={filters} onChange={setFilters} />

      <TaskHistoryTable
        tasks={tasks}
        isLoading={isLoading}
        error={error}
        onEditClick={(task) => setEditingTask(task)}
      />

      {hasNextPage && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="cursor-pointer px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
          >
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </button>
        </div>
      )}

      {editingTask && (
        <div
          onMouseDown={(e) => e.target === e.currentTarget && setEditingTask(null)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-bold mb-4">Edit the task</h2>

            <TaskForm
              projectId={editingTask.project_id}
              taskId={editingTask.id}
              initialData={{
                project_id: editingTask.project_id,
                user_id: editingTask.user_id,
                title: editingTask.title,
                hours: Math.floor(Math.abs(editingTask.time_spent_seconds) / 3600),
                minutes: Math.floor((Math.abs(editingTask.time_spent_seconds) % 3600) / 60),
                description: editingTask.description,
              }}
              onSuccess={() => setEditingTask(null)}
              onCancel={() => setEditingTask(null)}
            />
          </div>
        </div>
      )}
    </main>
  )
}
