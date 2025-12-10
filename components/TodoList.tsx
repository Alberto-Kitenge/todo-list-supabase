// Composant liste de todos avec statistiques

import { Todo } from "@/lib/types";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in-up">
        {/* Illustration vide stylisée */}
        <div
          className="inline-flex items-center justify-center w-32 h-32 rounded-full 
                      bg-gradient-to-br from-purple-100 to-blue-100 
                      dark:from-purple-900/20 dark:to-blue-900/20 mb-6 animate-pulse"
        >
          <svg
            className="w-16 h-16 text-purple-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>

        <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
          Aucune tâche pour le moment
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Commencez votre journée en ajoutant votre première tâche !
        </p>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 justify-center">
          <span
            className="px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/20 
                       text-purple-700 dark:text-purple-400 text-sm"
          >
            💡 Idée : Planifier la semaine
          </span>
          <span
            className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/20 
                       text-blue-700 dark:text-blue-400 text-sm"
          >
            🎯 Définir des objectifs
          </span>
          <span
            className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 
                       text-green-700 dark:text-green-400 text-sm"
          >
            ✨ Commencer petit
          </span>
        </div>
      </div>
    );
  }

  const completedCount = todos.filter((todo) => todo.is_completed).length;
  const totalCount = todos.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gradient-primary mb-1">
              Vos Tâches
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gardez le cap sur vos objectifs
            </p>
          </div>

          {/* Graphique de progression circulaire */}
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              {/* Cercle de fond */}
              <circle
                cx="48"
                cy="48"
                r="40"
                className="stroke-gray-200 dark:stroke-gray-700"
                strokeWidth="8"
                fill="none"
              />
              {/* Cercle de progression avec gradient */}
              <circle
                cx="48"
                cy="48"
                r="40"
                className="stroke-purple-500 transition-all duration-1000"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${
                  2 * Math.PI * 40 * (1 - progressPercentage / 100)
                }`}
                style={{
                  filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.4))",
                }}
              />
            </svg>
            {/* Pourcentage au centre */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gradient-primary">
                {progressPercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Badges de statistiques */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-purple-100 dark:bg-purple-900/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
              {totalCount}
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-500">
              Total
            </div>
          </div>
          <div className="bg-green-100 dark:bg-green-900/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">
              {completedCount}
            </div>
            <div className="text-xs text-green-600 dark:text-green-500">
              Complétées
            </div>
          </div>
          <div className="bg-orange-100 dark:bg-orange-900/20 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">
              {totalCount - completedCount}
            </div>
            <div className="text-xs text-orange-600 dark:text-orange-500">
              Restantes
            </div>
          </div>
        </div>
      </div>

      {/* Liste des todos avec scroll */}
      <div className="max-h-[600px] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {todos.map((todo, index) => (
          <div
            key={todo.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <TodoItem todo={todo} />
          </div>
        ))}
      </div>
    </div>
  );
}
