'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dispatch, useState } from 'react';
import { TasksAction } from '@/types/task';
import { toast } from 'sonner';

export function AddTask({ dispatch }: { dispatch: Dispatch<TasksAction> }) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleAddTask() {
    if (!text.trim()) {
      toast.error('O texto da tarefa não pode estar vazio');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const newTask = {
        type: 'added' as const, // Corrige o tipo literal
        id: Date.now(),
        text: text.trim(),
      };
      
      dispatch(newTask);
      setText('');
      toast.success('Tarefa adicionada com sucesso!', {
        description: `"${text.trim()}" foi adicionada à lista`,
      });
    } catch (error) {
      toast.error('Erro ao adicionar tarefa', {
        description: error instanceof Error ? error.message : 'Ocorreu um erro ao tentar adicionar a tarefa',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex gap-2 mb-6">
      <Input
        placeholder="Adicionar tarefa"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
        disabled={isSubmitting}
      />
      <Button 
        onClick={handleAddTask}
        disabled={isSubmitting || !text.trim()}
      >
        {isSubmitting ? 'Adicionando...' : 'Adicionar'}
      </Button>
    </div>
  );
}