'use client';
import { useState } from 'react';
import { useTarefas } from '@/data/ContextTarefa';

export default function NovaTarefaPage() {
  const [texto, setTexto] = useState('');
  const { adicionarTarefa } = useTarefas();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adicionarTarefa({
      id: Date.now(),
      todo: texto,
      completed: false,
      userId: 1
    });
    setTexto('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Adicionar Nova Tarefa</h2>
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Digite a tarefa"
        className="border p-2 w-full"
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Adicionar
      </button>
    </form>
  );
}