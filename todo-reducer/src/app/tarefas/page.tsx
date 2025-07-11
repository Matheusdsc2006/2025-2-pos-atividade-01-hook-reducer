'use client';
import { useTarefas } from '@/data/ContextTarefa';

export default function ListaTarefasPage() {
  const { tarefas } = useTarefas();
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Lista de Tarefas</h2>
      <ul className="space-y-2">
        {tarefas.map(tarefa => (
          <li key={tarefa.id} className="border p-2 rounded">
            <span>{tarefa.todo}</span>
            <span className="ml-2 text-sm text-gray-500">
              [{tarefa.completed ? 'Concluída' : 'Pendente'}]
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}