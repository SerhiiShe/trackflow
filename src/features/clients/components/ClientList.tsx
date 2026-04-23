import { formatSeconds } from '../../../shared/timeFormat'
import { useClients } from '../hooks/useClients'

interface ClientListProps {
  onLogTimeClick: (clientId: string) => void
}

export const ClientList = ({ onLogTimeClick }: ClientListProps) => {
  const { data: clients, isLoading, error } = useClients()

  if (isLoading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-500">{(error as Error).message}</div>
  if (!clients?.length) return <div className="p-4 text-gray-500">Create your first client</div>

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {clients?.map((client) => {
        const isOverlimit = client.remaining_seconds < 0

        const progressPercentage =
          client.total_seconds_limit > 0
            ? isOverlimit
              ? 100
              : (client.remaining_seconds / client.total_seconds_limit) * 100
            : 0

        return (
          <div
            key={client.id}
            className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-bold text-gray-800">{client.name}</h3>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className=" text-gray-500">Support hours:</span>
                <div className="font-semibold text-gray-600">
                  <span className={isOverlimit ? 'text-red-500' : ''}>
                    {formatSeconds(client.remaining_seconds)}
                  </span>{' '}
                  / <span>{formatSeconds(client.total_seconds_limit)}</span>
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
              onClick={() => onLogTimeClick(client.id)}
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
              Write off time
            </button>
          </div>
        )
      })}
    </div>
  )
}
