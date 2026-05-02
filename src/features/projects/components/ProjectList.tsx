import { formatSeconds } from '../../../shared/timeFormat'
import { useArchiveProject } from '../hooks/useArchiveProject'
import { useProjects } from '../hooks/useProjects'

interface ProjectListProps {
  onLogTimeClick: (projectId: string) => void
}

export const ProjectList = ({ onLogTimeClick }: ProjectListProps) => {
  const { data: projects, isLoading, error } = useProjects()
  const { mutate: archiveProject, isPending: isArchiving } = useArchiveProject()

  const handleArchive = (id: string, name: string) => {
    if (window.confirm(`Move project "${name}" to archive?`)) {
      archiveProject(id)
    }
  }

  if (isLoading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-500">{(error as Error).message}</div>
  if (!projects?.length) return <div className="p-4 text-gray-500">Create your first project</div>

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects?.map((project) => {
        const isOverlimit = project.remaining_seconds < 0

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
                <h3 className="text-xl font-bold text-gray-800">{project.name}</h3>
                <span className="text-sm font-medium text-gray-600">{project.clients?.name}</span>
              </div>

              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all">
              <button
                onClick={() => handleArchive(project.id, project.name)}
                disabled={isArchiving}
                className="cursor-pointer w-6 text-gray-400 hover:text-orange-500"
                title='Archive'
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 12C9 11.5341 9 11.3011 9.07612 11.1173C9.17761 10.8723 9.37229 10.6776 9.61732 10.5761C9.80109 10.5 10.0341 10.5 10.5 10.5H13.5C13.9659 10.5 14.1989 10.5 14.3827 10.5761C14.6277 10.6776 14.8224 10.8723 14.9239 11.1173C15 11.3011 15 11.5341 15 12C15 12.4659 15 12.6989 14.9239 12.8827C14.8224 13.1277 14.6277 13.3224 14.3827 13.4239C14.1989 13.5 13.9659 13.5 13.5 13.5H10.5C10.0341 13.5 9.80109 13.5 9.61732 13.4239C9.37229 13.3224 9.17761 13.1277 9.07612 12.8827C9 12.6989 9 12.4659 9 12Z" stroke="currentColor" stroke-width="1.5"></path> <path d="M20.5 7V13C20.5 16.7712 20.5 18.6569 19.3284 19.8284C18.1569 21 16.2712 21 12.5 21H11.5M3.5 7V13C3.5 16.7712 3.5 18.6569 4.67157 19.8284C5.37634 20.5332 6.3395 20.814 7.81608 20.9259" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> <path d="M12 3H4C3.05719 3 2.58579 3 2.29289 3.29289C2 3.58579 2 4.05719 2 5C2 5.94281 2 6.41421 2.29289 6.70711C2.58579 7 3.05719 7 4 7H20C20.9428 7 21.4142 7 21.7071 6.70711C22 6.41421 22 5.94281 22 5C22 4.05719 22 3.58579 21.7071 3.29289C21.4142 3 20.9428 3 20 3H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
              </button>
              </div>
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

            <button
              onClick={() => onLogTimeClick(project.id)}
              className="cursor-pointer mt-6 w-full py-2 px-4 bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
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
              Add a new task
            </button>
          </div>
        )
      })}
    </div>
  )
}
