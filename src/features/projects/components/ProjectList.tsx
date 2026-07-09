import { formatSeconds } from '../../../utils/timeFormat'
import { useProjects } from '../hooks/useProjects'
import type { Project } from '../types'

interface ProjectListProps {
  showFinished: boolean
  viewMode: 'grid' | 'list'
  onLogTimeClick: (projectId: string) => void
  onEditClick: (project: Project) => void
  isEmployee: boolean
}

export const ProjectList = ({
  showFinished,
  viewMode,
  onLogTimeClick,
  onEditClick,
  isEmployee,
}: ProjectListProps) => {
  const { data: projects, isLoading, error } = useProjects()

  const filteredProjects = projects?.filter((p) => (showFinished ? true : p.status !== 'Finished'))

  if (isLoading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-500">{(error as Error).message}</div>
  if (!projects?.length) return <div className="p-4 text-gray-500">Create your first project</div>

  // List view
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-auto max-h-[70vh]">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-4">Project</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Hours</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProjects?.map((project) => {
              const isOverlimit = project.remaining_seconds < 0
              const isFinished = project.status === 'Finished'

              return (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors border-b border-gray-300">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900 text-base">{project.name}</div>
                    <div className="text-gray-500 text-xs mt-0.5">
                      {project.clients?.name || 'No client'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded border ${
                        isFinished
                          ? 'text-red-600 bg-red-50 border-red-200'
                          : 'text-green-600 bg-green-50 border-green-200'
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">         
                      <div className="font-semibold text-gray-600">
                        <span className={isOverlimit ? 'text-red-500' : ''}>
                          {formatSeconds(project.remaining_seconds)}
                        </span>{' '}
                        / <span>{formatSeconds(project.total_seconds_limit)}</span>
                      </div>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap space-x-3">
                    {isEmployee && (
                      <div className="space-x-2 transition-all">
                        <button
                          onClick={() => onEditClick(project)}
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

                        <button
                          onClick={() => onLogTimeClick(project.id)}
                          className="cursor-pointer w-6 text-gray-400 hover:text-blue-600"
                          disabled={isFinished}
                          title={isFinished ? 'Project is finished' : 'Add a new task'}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  // Grid view
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredProjects?.map((project) => {
        const isOverlimit = project.remaining_seconds < 0
        const isFinished = project.status === 'Finished'

        const progressPercentage =
          project.total_seconds_limit > 0
            ? isOverlimit
              ? 100
              : (project.remaining_seconds / project.total_seconds_limit) * 100
            : 0

        return (
          <div
            key={project.id}
            className="flex flex-col p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow relative group"
          >
            <div className="flex-1 flex justify-between">
              <div className="pr-18">
                <span
                  className={`inline-block text-xs font-bold mb-1 ${
                    isFinished ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {project.status}
                </span>
                <h3 className="text-xl font-bold text-gray-800">{project.name}</h3>
                <span className="text-sm font-medium text-gray-600">{project.clients?.name}</span>
              </div>

              {isEmployee && (
                <div className="absolute top-6 right-6 opacity-0 space-x-2 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => onEditClick(project)}
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
                </div>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className=" text-gray-500">Hours:</span>
                <div className="font-semibold text-gray-600">
                  <span className={isOverlimit ? 'text-red-500' : ''}>
                    {formatSeconds(project.remaining_seconds)}
                  </span>{' '}
                  / <span>{formatSeconds(project.total_seconds_limit)}</span>
                </div>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${isOverlimit ? 'bg-red-200' : 'bg-blue-600'}`}
                style={{
                  width: `${progressPercentage}%`,
                }}
              ></div>
            </div>

            {isEmployee && (
              <button
                onClick={() => onLogTimeClick(project.id)}
                className="cursor-pointer mt-6 w-full py-2 px-4 bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:pointer-events-none disabled:opacity-50"
                disabled={isFinished}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {isFinished ? 'Project is finished' : 'Add a new task'}
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
