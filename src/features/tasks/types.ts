export interface CreateTaskInput {
  client_id: string
  title: string
  description: string
  hours: number
  minutes: number
}

export interface TaskFormProps {
  clientId: string,
  onSuccess: () => void,
}