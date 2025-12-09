// Composant todo individuel avec design premium

"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Todo, TodoUpdate } from "@/lib/types";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleToggle = async () => {
    setLoading(true);

    const updateData: TodoUpdate = {
      is_completed: !todo.is_completed,
    };

    const { error } = await supabase
      .from("todos")
      .update(updateData)
      .eq("id", todo.id);

    if (!error) {
      router.refresh();
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setLoading(true);

    // Animation de suppression avant la vraie suppression
    setTimeout(async () => {
      const { error } = await supabase.from("todos").delete().eq("id", todo.id);

      if (!error) {
        router.refresh();
      } else {
        setLoading(false);
        setIsDeleting(false);
      }
    }, 300);
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-xl transition-all duration-300
                 ${
                   isDeleting
                     ? "opacity-0 scale-95 -translate-x-full"
                     : "opacity-100 scale-100"
                 }
                 ${
                   todo.is_completed
                     ? "bg-gray-100 dark:bg-gray-800/50"
                     : "glass hover:glass-strong"
                 }
                 ${loading ? "pointer-events-none" : ""}`}
    >
      {/* Barre de couleur à gauche */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300
                      ${
                        todo.is_completed
                          ? "bg-green-500"
                          : "bg-gradient-to-b from-purple-500 to-blue-500 group-hover:w-2"
                      }`}
      />

      {/* Contenu principal */}
      <div className="flex items-center gap-4 p-4 pl-6">
        {/* Checkbox stylisée */}
        <div className="relative flex-shrink-0">
          <input
            type="checkbox"
            checked={todo.is_completed}
            onChange={handleToggle}
            className="w-6 h-6 rounded-full border-2 border-purple-500 appearance-none checked:bg-gradient-to-br checked:from-purple-500 checked:to-blue-500 cursor-pointer transition-all duration-300 hover:scale-110 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            disabled={loading}
          />
          {todo.is_completed && (
            <svg
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none animate-scale-in"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>

        {/* Texte de la tâche */}
        <span
          className={`flex-1 text-lg transition-all duration-300
                     ${
                       todo.is_completed
                         ? "line-through opacity-60 text-gray-600 dark:text-gray-500"
                         : "text-gray-800 dark:text-gray-200"
                     }`}
        >
          {todo.name}
        </span>

        {/* Container pour les badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Badge de catégorie */}
          {todo.category && (
            <span
              className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 
                         text-blue-700 dark:text-blue-400 animate-fade-in"
            >
              {todo.category === "Travail" && "💼"}
              {todo.category === "Personnel" && "🏠"}
              {todo.category === "Santé" && "💪"}
              {todo.category === "Études" && "📚"}
              {todo.category === "Autres" && "📌"} {todo.category}
            </span>
          )}

          {/* Badge de priorité */}
          {todo.priority && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium animate-fade-in
                ${
                  todo.priority === "Haute"
                    ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    : todo.priority === "Moyenne"
                    ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                    : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                }`}
            >
              {todo.priority === "Haute" && "🔴"}
              {todo.priority === "Moyenne" && "🟡"}
              {todo.priority === "Basse" && "🟢"} {todo.priority}
            </span>
          )}

          {/* Badge de date d'échéance */}
          {todo.due_date && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 animate-fade-in
                ${(() => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const dueDate = new Date(todo.due_date);
                  dueDate.setHours(0, 0, 0, 0);
                  const diffTime = dueDate.getTime() - today.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                  if (diffDays < 0) {
                    return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
                  } else if (diffDays <= 3) {
                    return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400";
                  } else {
                    return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
                  }
                })()}`}
            >
              ⏰{" "}
              {new Date(todo.due_date).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "short",
              })}
            </span>
          )}

          {/* Badge de statut complété */}
          {todo.is_completed && (
            <span
              className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 
                         text-green-700 dark:text-green-400 animate-fade-in"
            >
              ✓ Complété
            </span>
          )}
        </div>

        {/* Bouton de suppression avec effet */}
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500"
          disabled={loading}
          aria-label="Supprimer la tâche"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {/* Overlay de chargement */}
      {loading && (
        <div
          className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm 
                      flex items-center justify-center"
        >
          <div
            className="w-6 h-6 border-3 border-purple-500 border-t-transparent 
                        rounded-full animate-spin"
          ></div>
        </div>
      )}
    </div>
  );
}
