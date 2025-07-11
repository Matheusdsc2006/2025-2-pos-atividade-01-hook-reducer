export interface Tarefa {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface ListaTarefas {
  tarefas: Tarefa[];
  adicionarTarefa: (tarefa: Tarefa) => void;
}