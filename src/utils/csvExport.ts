import type { Project } from '../features/projects/types'
import type { TaskLog } from '../features/tasks/types'
import { formatSeconds } from './timeFormat'

export const downloadTaskLogsCSV = (tasks: TaskLog[], selectedProject: Project | null) => {
  const headers = ['Date', 'Client', 'Project', 'Assignee', 'Task', 'Description', 'Time Spent']

  const escapeCSV = (str: string | null | undefined) => {
    if (!str) return '""'
    const cleanStr = str.replace(/\n/g, ' ').replace(/"/g, '""')
    return `"${cleanStr}"`
  }

  const rows = tasks.map((task) => {
    const date = new Date(task.date).toLocaleDateString('de-CH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    const client = task.projects?.clients?.name || '—'
    const project = task.projects?.name || '—'
    const user = task.profiles?.full_name || task.profiles?.email || '—'
    const title = task.title
    const description = task?.description || '—'
    const timeSpent = formatSeconds(task.time_spent_seconds)

    return [
      escapeCSV(date),
      escapeCSV(client),
      escapeCSV(project),
      escapeCSV(user),
      escapeCSV(title),
      escapeCSV(description),
      escapeCSV(timeSpent),
    ].join(',')
  })

  let csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n')

  const totalTime = tasks.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.time_spent_seconds
  }, 0)

  csvContent += `\n\n,,,,,Total time,${formatSeconds(totalTime)}`

  if (selectedProject) {
    csvContent += `\n,,,,,Remaining time for '${selectedProject.name}' project,${formatSeconds(selectedProject.remaining_seconds)}`
  }

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `tasks_export_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
