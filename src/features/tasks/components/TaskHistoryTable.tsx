import { useTasks } from '../hooks/useTasks'
import { formatSeconds } from '../../../shared/timeFormat'
import { useDeleteTask } from '../hooks/useDeleteTask'

export const TaskHistoryTable = () => {
  const { data: tasks, isLoading, error } = useTasks()
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask()

  const handleDelete = (taskId: string) => {
    if (
      window.confirm(
        'Are you sure you want to delete this entry? The time will be returned to the client.',
      )
    ) {
      deleteTask(taskId)
    }
  }

  if (isLoading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-500">{(error as Error).message}</div>
  if (!tasks?.length) return <div className="p-4 text-gray-500">The history is empty</div>

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Client</th>
            <th className="px-6 py-4">Task</th>
            <th className="px-6 py-4">Description</th>
            <th className="px-6 py-4 text-right">Time spent</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(task.created_at).toLocaleDateString('de-CH', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                {task.clients?.name || 'Deleted client'}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">{task.title}</td>
              <td className="px-6 py-4 max-w-xs truncate" title={task.description || '—'}>
                {task.description || '—'}
              </td>
              <td className="px-6 py-4 text-right font-semibold text-blue-600">
                {formatSeconds(task.time_spent_seconds)}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                <button
                  onClick={() => handleDelete(task.id)}
                  disabled={isDeleting}
                  className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                  title="Delete entry"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
