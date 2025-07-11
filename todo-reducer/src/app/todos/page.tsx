'use client';

import { useEffect, useReducer } from 'react';
import { tasksReducer, loadTasks } from '@/lib/tasksReducer';
import { AddTask } from '@/components/AddTask';
import { TaskList } from '@/components/TaskList';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  // Carrega tarefas do localStorage no mount
  useEffect(() => {
    const savedTasks = loadTasks();
    dispatch({ type: 'loaded', tasks: savedTasks });
  }, []);

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo App</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <AddTask dispatch={dispatch} />
        <TaskList tasks={tasks} dispatch={dispatch} />
      </div>
    </div>
  );
}