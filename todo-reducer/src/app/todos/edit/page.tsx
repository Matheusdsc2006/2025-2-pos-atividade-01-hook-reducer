'use client';

import { notFound, useRouter } from 'next/navigation';
import { useEffect, useReducer } from 'react';
import { TaskForm } from '@/components/TaskForm';
import { tasksReducer, loadTasks } from '@/lib/tasksReducer';

export default function EditTaskPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const taskId = Number(params.id);

  // Carrega tarefas do localStorage
  useEffect(() => {
    const savedTasks = loadTasks();
    dispatch({ type: 'loaded', tasks: savedTasks });
  }, []);

  const task = tasks.find(t => t.id === taskId);

  // Redireciona se não encontrar a tarefa
  if (params.id !== 'new' && !task && tasks.length > 0) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">
        {task ? 'Edit Task' : 'Create New Task'}
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <TaskForm 
          task={task} 
          tasks={tasks} 
          dispatch={dispatch} 
          onSuccess={() => router.push('/todos')}
        />
      </div>
    </div>
  );
}