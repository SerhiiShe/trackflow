export interface CreateTaskInput {
  project_id: string
  user_id: string
  title: string
  hours: number
  minutes: number
  description?: string
}

export interface TaskLog {
  id: string
  project_id: string
  user_id: string
  title: string
  time_spent_seconds: number
  description?: string
  created_at: string
  projects?: {
    name: string
    clients?: {
      name: string
    } | null
  } | null
  profiles?: {
    email: string
    full_name: string
  } | null
}

export interface TaskFilters {
  search?: string
  projectId?: string
  clientId?: string
  userId?: string
  sortBy?: 'date_desc' | 'date_asc' | 'time_desc' | 'time_asc'
  pageParam?: number
}
