'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Tarefa, ListaTarefas } from '@/types/tarefa';

const TarefaContext = createContext<ListaTarefas | undefined>(undefined);

export const TarefaProvider = ({ children }: { children: React.ReactNode }) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/todos')
      .then(res => res.json())
      .then(data => setTarefas(data.todos));
  }, []);

  const adicionarTarefa = (tarefa: Tarefa) => {
    setTarefas(prev => [...prev, tarefa]);
  };

  return (
    <TarefaContext.Provider value={{ tarefas, adicionarTarefa }}>
      {children}
    </TarefaContext.Provider>
  );
};

export const useTarefas = () => {
  const context = useContext(TarefaContext);
  if (!context) throw new Error('useTarefas deve ser usado dentro de TarefaProvider');
  return context;
};