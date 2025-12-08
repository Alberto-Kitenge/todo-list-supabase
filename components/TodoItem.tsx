// Composant todo individuel

"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Todo } from "@/lib/types";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleToggle = async () => {
    setLoading(true);

    const { error } = await supabase
      .from("todos")
      .update({ is_completed: !todo.is_completed })
      .eq("id", todo.id);

    if (!error) {
      router.refresh();
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);

    const { error } = await supabase.from("todos").delete().eq("id", todo.id);

    if (!error) {
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
      <input
        type="checkbox"
        checked={todo.is_completed}
        onChange={handleToggle}
        className="checkbox checkbox-primary"
        disabled={loading}
      />

      <span
        className={`flex-1 ${
          todo.is_completed ? "line-through opacity-50" : ""
        }`}
      >
        {todo.name}
      </span>

      <button
        onClick={handleDelete}
        className="btn btn-ghost btn-sm btn-circle text-error"
        disabled={loading}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
