export interface Client {
  id: string
  name: string
  created_at: string
}

export interface CreateClientInput {
  name: string
}
