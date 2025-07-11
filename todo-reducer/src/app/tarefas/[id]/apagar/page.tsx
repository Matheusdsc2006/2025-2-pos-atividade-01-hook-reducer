'use client';

import { useRouter, notFound } from 'next/navigation';
import { useEffect, useReducer, use, useState } from 'react';
import { tasksReducer, loadTasks } from '@/lib/tasksReducer';
import { Task } from '@/types/task';

export default function ApagarTarefaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const taskId = Number(id);
  const router = useRouter();
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const savedTasks = loadTasks();
    dispatch({ type: 'loaded', tasks: savedTasks });
  }, []);

  const task = tasks.find((t) => t.id === taskId);

  if (!task && tasks.length > 0 && !isDeleting) {
    return notFound();
  }

  const handleDelete = () => {
    setIsDeleting(true);
    dispatch({ type: 'deleted', id: taskId });
    router.push('/tarefas');
  };

  const handleCancel = () => {
    router.push('/tarefas');
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-900 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8 border border-zinc-200 dark:border-zinc-700">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-white text-center mb-6">
          Confirmar Exclusão
        </h1>

        {task && (
          <div className="mb-4 text-zinc-700 dark:text-zinc-300">
            <p><strong>ID:</strong> {task.id}</p>
            <p><strong>Texto:</strong> {task.text}</p>
            <p><strong>Concluída:</strong> {task.done ? 'Sim' : 'Não'}</p>
          </div>
        )}

        <p className="text-red-600 text-sm text-center mb-6">
          Tem certeza que deseja apagar esta tarefa? Esta ação não pode ser desfeita.
        </p>

        <div className="flex justify-between gap-4">
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            Apagar
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 border border-zinc-300 dark:border-zinc-600 py-2 px-4 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </main>
  );
}
