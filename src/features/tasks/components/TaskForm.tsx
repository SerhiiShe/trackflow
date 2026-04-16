import { z } from 'zod'
import type { TaskFormProps } from '../types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateTask } from '../hooks/useCreateTask'

const taskSchema = z
  .object({
    client_id: z.uuid('Select a client'),
    title: z.string().min(3, 'Write what was done'),
    description: z.string().optional(),
    hours: z.number().min(0),
    minutes: z.number().min(0).max(59, 'Maximum 59 minutes'),
  })
  .refine((data) => data.hours > 0 || data.minutes > 0, {
    message: 'Time cannot be zero',
    path: ['hours'],
  })

type TaskFormValues = z.infer<typeof taskSchema>

export const TaskForm = ({ clientId, onSuccess }: TaskFormProps) => {
  const { mutate, isPending } = useCreateTask()

  const { register, handleSubmit, formState: { errors } } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      client_id: clientId,
      hours: 0,
      minutes: 0,
    },
  })

  const onSubmit = (data: TaskFormValues) => {
    mutate(data)
  }

  return <form onSubmit={handleSubmit(onSubmit)}></form>
}
