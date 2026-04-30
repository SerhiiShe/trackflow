import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProjectsPage } from '../pages/ProjectsPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TaskHistoryPage } from '../pages/TaskHistoryPage'
import { Navbar } from '../components/Navbar'
import { useEffect } from 'react'
import { useAuthStore } from '../features/auth/store/authStore'
import { supabase } from '../lib/supabaseClient'
import { AuthPage } from '../pages/AuthPage'
import { ProtectedRoute } from './router/ProtectedRoute'
import { AuthRoute } from './router/AuthRoute'
import { ClientsPage } from '../pages/ClientsPage'

const queryClient = new QueryClient()

export const App = () => {
  const { setAuth, clearAuth } = useAuthStore()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuth(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuth(session)
      } else {
        clearAuth()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [setAuth, clearAuth])

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />

          <Routes>
            <Route element={<AuthRoute />}>
              <Route path="/auth" element={<AuthPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<ProjectsPage />} />
              <Route path="/history" element={<TaskHistoryPage />} />
              <Route path="/clients" element={<ClientsPage />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
