import { TaskHistoryTable } from "../features/tasks/components/TaskHistoryTable"

export const TaskHistoryPage = () => {
  return (
    <main className="container mx-auto py-10 px-4">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 pb-1">History</h1>
          <p className="text-gray-500">All completed tasks and time spent.</p>
        </div>
      </header>

      <TaskHistoryTable />
    </main>
  )
}
