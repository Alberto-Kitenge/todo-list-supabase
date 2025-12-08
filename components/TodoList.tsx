// Composant liste de todos

import { Todo } from "@/lib/types";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-xl text-base-content/60">
          Aucune tâche pour le moment
        </p>
        <p className="text-sm text-base-content/40 mt-2">
          Ajoutez votre première tâche ci-dessus !
        </p>
      </div>
    );
  }

  const completedCount = todos.filter((todo) => todo.is_completed).length;
  const totalCount = todos.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-base-content/60">
        <span>
          {completedCount} / {totalCount} complétée
          {completedCount > 1 ? "s" : ""}
        </span>
        <div className="flex gap-2">
          <div className="badge badge-primary">{totalCount} total</div>
          <div className="badge badge-success">{completedCount} faites</div>
          <div className="badge badge-warning">
            {totalCount - completedCount} restante
            {totalCount - completedCount > 1 ? "s" : ""}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
