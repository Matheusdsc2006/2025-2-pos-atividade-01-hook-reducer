'use client';

import { useEffect, useReducer } from 'react';
import { tasksReducer, loadTasks } from '@/lib/tasksReducer';
import { AddTask } from '@/components/AddTask';
import { TaskList } from '@/components/TaskList';

export default function TarefasPage() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  useEffect(() => {
    const savedTasks = loadTasks();
    dispatch({ type: 'loaded', tasks: savedTasks });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-900 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8 border border-zinc-200 dark:border-zinc-700">
        <h1 className="text-3xl font-semibold text-zinc-800 dark:text-white text-center mb-8">
          Lista de Tarefas
        </h1>

        <div className="space-y-6">
          <AddTask dispatch={dispatch} />
          <TaskList tasks={tasks} dispatch={dispatch} />
        </div>
      </div>
    </main>
  );
}
