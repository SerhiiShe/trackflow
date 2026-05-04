import { useState } from 'react'
import { ClientList } from '../features/clients/components/ClientList'
import { ClientForm } from '../features/clients/components/ClientForm'
import type { Client } from '../features/clients/types'

export const ClientsPage = () => {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  return (
    <main className="container mx-auto py-10 px-4">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 pb-1">Clients</h1>
          <p className="text-gray-500">List of all clients.</p>
        </div>

        <button
          onClick={() => setIsClientModalOpen(true)}
          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + New client
        </button>
      </header>

      <ClientList onEditClick={(client) => setEditingClient(client)} />

      {isClientModalOpen && (
        <div
          onMouseDown={(e) => e.target === e.currentTarget && setIsClientModalOpen(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-bold mb-4">Add a new client</h2>

            <ClientForm
              onSuccess={() => setIsClientModalOpen(false)}
              onCancel={() => setIsClientModalOpen(false)}
            />
          </div>
        </div>
      )}

      {editingClient && (
        <div
          onMouseDown={(e) => e.target === e.currentTarget && setEditingClient(null)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-bold mb-4">Edit the client</h2>

            <ClientForm
              clientId={editingClient.id}
              initialData={{
                name: editingClient.name
              }}
              onSuccess={() => setEditingClient(null)}
              onCancel={() => setEditingClient(null)}
            />
          </div>
        </div>
      )}
    </main>
  )
}
