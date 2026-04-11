import { useState } from 'react'
import { ClientList } from '../features/clients/components/ClientList'
import { ClientForm } from '../features/clients/components/ClientForm'

export const ClientsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="container mx-auto py-10 px-4">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Clients</h1>
          <p className="text-gray-500">Support packages and remaining hours management.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + New client
        </button>
      </header>

      <ClientList />

      {isModalOpen && (
        <div
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-bold mb-4">Add a new client</h2>

            <ClientForm
              onSuccess={() => setIsModalOpen(false)}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </main>
  )
}
