export interface Client {
  id: string
  name: string
  total_seconds_limit: number
  remaining_seconds: number
  created_at: string
}

export interface CreateClientInput {
  name: string
  total_hours_limit: number
}

export interface ClientFormProps {
  onSuccess: () => void
  onCancel: () => void
}
