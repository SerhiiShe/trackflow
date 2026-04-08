import { ClientList } from '../features/clients/components/ClientList'

export const ClientsPage = () => {
  return (
    <main className='container mx-auto py-10 px-4'>
      <header className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Clients</h1>
          <p className='text-gray-500'>Support packages and remaining hours management.</p>
        </div>

        <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
          + New client
        </button>
      </header>

      <ClientList />
    </main>
  )
}
