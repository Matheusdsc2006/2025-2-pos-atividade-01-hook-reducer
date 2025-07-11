'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Dispatch } from 'react';
import { TasksAction, Task } from '@/types/task';

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
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Task text cannot be empty',
        variant: 'destructive'
      });
      return;
    }

    if (task) {
      dispatch({
        type: 'changed',
        task: { ...task, text, done }
      });
      toast({
        title: 'Success',
        description: 'Task updated successfully'
      });
    } else {
      dispatch({
        type: 'added',
        id: Date.now(),
        text
      });
      toast({
        title: 'Success',
        description: 'Task added successfully'
      });
    }

    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text">Task Description</Label>
        <Input
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="done"
          checked={done}
          onCheckedChange={(checked) => setDone(Boolean(checked))}
        />
        <Label htmlFor="done">Completed</Label>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" variant="default">
          {task ? 'Update Task' : 'Add Task'}
        </Button>
      </div>
    </form>
  );
}