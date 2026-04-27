export interface Project {
  id: string
  name: string
  total_seconds_limit: number
  remaining_seconds: number
  created_at: string
}

export interface CreateProjectInput {
  name: string
  total_hours_limit: number
}
