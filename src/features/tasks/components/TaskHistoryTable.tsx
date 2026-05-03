import { useTasks } from '../hooks/useTasks'
import { formatSeconds } from '../../../shared/timeFormat'
import { useDeleteTask } from '../hooks/useDeleteTask'
import type { TaskLog } from '../types'

interface TaskHistoryTableProps {
  onEditClick: (task: TaskLog) => void
}

export const TaskHistoryTable = ({ onEditClick }: TaskHistoryTableProps) => {
  const { data: tasks, isLoading, error } = useTasks()
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
  if (!tasks?.length) return <div className="p-4 text-gray-500">The history is empty</div>

  return (
    <div className="max-h-[70vh] overflow-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Project</th>
            <th className="px-6 py-4">Client</th>
            <th className="px-6 py-4">User</th>
            <th className="px-6 py-4">Task</th>
            <th className="px-6 py-4">Description</th>
            <th className="px-6 py-4 text-right">Time spent</th>
            <th className="px-6 py-4 text-right">Actions</th>
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
                {task.projects?.name || 'Deleted project'}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                {task.projects?.clients?.name || '—'}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                {task.profiles?.full_name || task.profiles?.email || '—'}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">{task.title}</td>
              <td className="px-6 py-4 max-w-xs truncate" title={task.description || '—'}>
                {task.description || '—'}
              </td>
              <td className="px-6 py-4 text-right font-semibold text-blue-600">
                {formatSeconds(task.time_spent_seconds)}
              </td>
              <td className="px-6 py-4 text-right whitespace-nowrap space-x-3">
                <button
                  onClick={() => handleDelete(task.id)}
                  disabled={isDeleting}
                  className="cursor-pointer w-6 text-gray-400 hover:text-red-500"
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

                <button
                  onClick={() => onEditClick(task)}
                  className="cursor-pointer w-6 text-gray-400 hover:text-blue-600"
                  title="Edit"
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
                        d="M2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12V10.5M13.5 2H12C7.28595 2 4.92893 2 3.46447 3.46447C2.49073 4.43821 2.16444 5.80655 2.0551 8"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecurrentcap="round"
                      ></path>{' '}
                      <path
                        d="M16.652 3.45506L17.3009 2.80624C18.3759 1.73125 20.1188 1.73125 21.1938 2.80624C22.2687 3.88124 22.2687 5.62415 21.1938 6.69914L20.5449 7.34795M16.652 3.45506C16.652 3.45506 16.7331 4.83379 17.9497 6.05032C19.1662 7.26685 20.5449 7.34795 20.5449 7.34795M16.652 3.45506L10.6872 9.41993C10.2832 9.82394 10.0812 10.0259 9.90743 10.2487C9.70249 10.5114 9.52679 10.7957 9.38344 11.0965C9.26191 11.3515 9.17157 11.6225 8.99089 12.1646L8.41242 13.9M20.5449 7.34795L17.5625 10.3304M14.5801 13.3128C14.1761 13.7168 13.9741 13.9188 13.7513 14.0926C13.4886 14.2975 13.2043 14.4732 12.9035 14.6166C12.6485 14.7381 12.3775 14.8284 11.8354 15.0091L10.1 15.5876M10.1 15.5876L8.97709 15.9619C8.71035 16.0508 8.41626 15.9814 8.21744 15.7826C8.01862 15.5837 7.9492 15.2897 8.03811 15.0229L8.41242 13.9M10.1 15.5876L8.41242 13.9"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecurrentcap="round"
                      ></path>{' '}
                    </g>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
