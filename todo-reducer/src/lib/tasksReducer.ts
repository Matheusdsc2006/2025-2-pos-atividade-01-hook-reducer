'use client';

import { Task, TasksAction } from '@/types/task';

const STORAGE_KEY = 'todo-app-tasks';

export function tasksReducer(tasks: Task[], action: TasksAction): Task[] {
  let newTasks: Task[] = [];
  
  switch (action.type) {
    case 'loaded':
      return action.tasks;
    case 'added':
      newTasks = [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      break;
    case 'changed':
      newTasks = tasks.map(t => 
        t.id === action.task.id ? { 
          ...action.task, 
          updatedAt: new Date() 
        } : t
      );
      break;
    case 'deleted':
      newTasks = tasks.filter(t => t.id !== action.id);
      break;
    default:
      throw Error('Unknown action: ' + JSON.stringify(action));
  }

  // Persiste no localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
  }
  
  return newTasks;
}

// Carrega tarefas do localStorage
export function loadTasks(): Task[] {
  if (typeof window === 'undefined') return [];
  
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return parsed.map((task: any) => ({
        ...task,
        createdAt: task.createdAt ? new Date(task.createdAt) : new Date(),
        updatedAt: task.updatedAt ? new Date(task.updatedAt) : new Date()
      }));
    } catch {
      return [];
    }
  }
  return [];
}