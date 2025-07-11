'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Dispatch, useState } from 'react';
import { Task, TasksAction } from '@/types';
import { toast } from 'sonner';

export function TaskForm({
  task,
  tasks,
  dispatch,
  onSuccess
}: {
  task?: Task;
  tasks: Task[];
  dispatch: Dispatch<TasksAction>;
  onSuccess?: () => void;
}) {
  const [text, setText] = useState(task?.text || '');
  const [done, setDone] = useState(task?.done || false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!text.trim()) {
        toast.error('Texto da tarefa não pode estar vazio');
        return;
      }

      if (task) {
        dispatch({
          type: 'changed',
          task: { 
            ...task, 
            text: text.trim(), 
            done,
            updatedAt: new Date() 
          }
        });
        toast.success('Tarefa atualizada com sucesso');
      } else {
        dispatch({
          type: 'added',
          id: Date.now(),
          text: text.trim()
        });
        toast.success('Tarefa adicionada com sucesso');
      }

      onSuccess?.();
    } catch (error) {
      toast.error('Erro na operação', {
        description: error instanceof Error ? error.message : 'Ocorreu um erro inesperado'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text">Descrição da Tarefa</Label>
        <Input
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="O que precisa ser feito?"
          disabled={isSubmitting}
        />
      </div>
      
      {task && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="done"
            checked={done}
            onCheckedChange={(checked: boolean) => setDone(checked)}
            disabled={isSubmitting}
          />
          <Label htmlFor="done">Concluída</Label>
        </div>
      )}
      
      <div className="flex justify-end pt-4">
        <Button 
          type="submit" 
          disabled={isSubmitting || !text.trim()}
          variant="default"
        >
          {isSubmitting ? 'Processando...' : (task ? 'Atualizar' : 'Adicionar')}
        </Button>
      </div>
    </form>
  );
}