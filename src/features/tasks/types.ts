export interface CreateTaskInput {
  client_id: string
  user_id: string
  title: string
  hours: number
  minutes: number
  description?: string
}

export interface TaskLog {
  id: string
  client_id: string
  title: string
  time_spent_seconds: number
  description?: string
  created_at: string
  clients?: {
    name: string
  } | null
  profiles?: {
    email: string
    full_name: string
  } | null
}
