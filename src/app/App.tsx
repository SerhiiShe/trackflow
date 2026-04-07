import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClientsPage } from '../pages/ClientsPage'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <ClientsPage />
      </div>
    </QueryClientProvider>
  )
}
