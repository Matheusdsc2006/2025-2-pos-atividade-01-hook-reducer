'use client';

import { useRouter, notFound } from 'next/navigation';
import { useEffect, useReducer, use } from 'react';
import { tasksReducer, loadTasks } from '@/lib/tasksReducer';
import { TaskForm } from '@/components/TaskForm';

export default function EditarTarefaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const taskId = Number(id);
  const router = useRouter();
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  useEffect(() => {
    const savedTasks = loadTasks();
    dispatch({ type: 'loaded', tasks: savedTasks });
  }, []);

  const task = tasks.find((t) => t.id === taskId);

  if (!task && tasks.length > 0) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-900 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8 border border-zinc-200 dark:border-zinc-700">
        <h1 className="text-3xl font-semibold text-zinc-800 dark:text-white text-center mb-6">
          Editar Tarefa
        </h1>

        <TaskForm
          task={task}
          tasks={tasks}
          dispatch={dispatch}
          onSuccess={() => router.push('/tarefas')}
        />
      </div>
    </main>
  );
}
