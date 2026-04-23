import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClientsPage } from '../pages/ClientsPage'
import { BrowserRouter, data, Route, Routes } from 'react-router-dom'
import { TaskHistoryPage } from '../pages/TaskHistoryPage'
import { Navbar } from '../components/Navbar'
import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { supabase } from '../lib/supabaseClient'

const queryClient = new QueryClient()

export const App = () => {
  const { setAuth, cleanAuth } = useAuthStore()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuth(session)
    })
    
  }, [setAuth, cleanAuth])

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
