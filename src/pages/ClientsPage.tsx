import { useState } from 'react'
import { ClientList } from '../features/clients/components/ClientList'
import { ClientForm } from '../features/clients/components/ClientForm'
import type { Client } from '../features/clients/types'

export const ClientsPage = () => {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    return (localStorage.getItem('clientsViewMode') as 'grid' | 'list') || 'grid'
  })

  const handleViewChange = (mode: 'grid' | 'list') => {
    setViewMode(mode)
    localStorage.setItem('clientsViewMode', mode)
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <header className="mb-6">
        <div className="flex justify-between items-center flex-wrap gap-x-6 gap-y-3">
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
        </div>

        <div className="flex gap-6 items-center border-t border-gray-300 pt-2 mt-3">
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
              <button
                onClick={() => handleViewChange('grid')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                title="Сетка"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button
                onClick={() => handleViewChange('list')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                title="Список"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
            </div>
            <span className="text-sm text-gray-600">View</span>
          </div>
        </div>
      </header>

      <ClientList onEditClick={(client) => setEditingClient(client)} viewMode={viewMode} />

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
                name: editingClient.name,
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
