import { useState } from "react"
import { TaskForm } from "../features/tasks/components/TaskForm"
import { TaskHistoryTable } from "../features/tasks/components/TaskHistoryTable"
import type { TaskLog } from "../features/tasks/types"

export const ClientsPage = () => {
  return (
    <main className="container mx-auto py-10 px-4">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 pb-1">Clients</h1>
          <p className="text-gray-500">List of all clients.</p>
        </div>
      </header>

      {/* <TaskHistoryTable onEditClick={(task) => setEditingTask(task)} /> */}

      {editingTask && (
              <div
                onMouseDown={(e) => e.target === e.currentTarget && setEditingTask(null)}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              >
                <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
                  <h2 className="text-lg font-bold mb-4">Edit the task</h2>
      
                  <TaskForm
                    projectId={editingTask.project_id}
                    taskId={editingTask.id}
                    initialData={{
                      project_id: editingTask.project_id,
                      user_id: editingTask.user_id,
                      title: editingTask.title,
                      hours: Math.floor(Math.abs(editingTask.time_spent_seconds) / 3600),
                      minutes: Math.floor(Math.abs(editingTask.time_spent_seconds) % 3600 / 60),
                      description: editingTask.description,
                    }}
                    onSuccess={() => setEditingTask(null)}
                    onCancel={() => setEditingTask(null)}
                  />
                </div>
              </div>
            )}
    </main>
  )
}
