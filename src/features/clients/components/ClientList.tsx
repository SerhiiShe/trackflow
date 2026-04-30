import { useClients } from '../hooks/useClients'

export const ClientList = () => {
  const { data: clients, isLoading, error } = useClients()

  if (isLoading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-500">{(error as Error).message}</div>
  if (!clients?.length) return <div className="p-4 text-gray-500">Create a first client</div>

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {clients?.map((client) => {
        return (
          <div
            key={client.id}
            className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-bold text-gray-800">{client.name}</h3>
          </div>
        )
      })}
    </div>
  )
}
