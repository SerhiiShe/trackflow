import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClientsPage } from '../pages/ClientsPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TaskHistoryPage } from '../pages/TaskHistoryPage'
import { Navbar } from '../components/Navbar'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />

          <Routes>
            <Route path="/" element={<ClientsPage />} />
            <Route path="/history" element={<TaskHistoryPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
