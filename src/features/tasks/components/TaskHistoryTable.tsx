import { useDeleteTask } from '../hooks/useDeleteTask'
import type { TaskLog } from '../types'
import { TaskHistoryTableRow } from './TaskHistoryTableRow'

interface TaskHistoryTableProps {
  tasks: TaskLog[] | undefined
  error: Error | null
  isLoading: boolean
  onEditClick: (task: TaskLog) => void
}

export const TaskHistoryTable = ({ tasks, error, isLoading, onEditClick }: TaskHistoryTableProps) => {
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask()

  const handleDelete = (taskId: string) => {
    if (
      window.confirm(
        'Are you sure you want to delete this entry? The time will be returned to the project.',
      )
    ) {
      deleteTask(taskId)
    }
  }

  if (isLoading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-500">{(error as Error).message}</div>
  if (!tasks?.length) return <div className="p-4 text-gray-500">No items found.</div>

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-auto max-h-[70vh]">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Task</th>
            <th className="px-6 py-4">Project</th>
            <th className="px-6 py-4">Client</th>
            <th className="px-6 py-4">Assignee</th>
            <th className="px-6 py-4">Description</th>
            <th className="px-6 py-4 text-right">Time spent</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskHistoryTableRow key={task.id} task={task} onDeleteClick={(taskId) => handleDelete(taskId)} isDeleting={isDeleting} onEditClick={() => onEditClick(task)} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
