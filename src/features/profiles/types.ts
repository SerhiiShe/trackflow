export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: 'employee' | 'client'
  client_id: string | null
}
