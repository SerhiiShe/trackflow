import { useClients } from '../hooks/useClients'

export const ClientList = () => {
  const { data: clients, isLoading, error } = useClients()

  if (isLoading) return <div className="p-4">Loading...</div>

  if (error) return <div className="p-4 text-red-500">{(error as Error).message}</div>

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {clients?.map((client) => (
        <div
          key={client.id}
          className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-xl font-bold text-gray-800">{client.name}</h3>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className=" text-gray-500">Support hours:</span>
              <span className="font-semibold text-gray-600">
                {client.remaining_hours} / {client.total_hours_limit}
              </span>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-600 rounded-full h-2"
              style={{ width: `${(client.remaining_hours / client.total_hours_limit) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}
