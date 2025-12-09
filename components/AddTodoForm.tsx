// Formulaire ajout todo avec design premium

"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { TodoInsert } from "@/lib/types";

export default function AddTodoForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const newTodo: TodoInsert = {
        name: name.trim(),
        user_id: user.id,
        is_completed: false,
        category: category || null,
        due_date: dueDate || null,
        priority: priority || null,
      };

      const { error } = await supabase.from("todos").insert([newTodo]);

      if (!error) {
        setName("");
        setCategory("");
        setDueDate("");
        setPriority("");
        router.refresh();
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="relative space-y-6">
      {/* Champ principal - Nom de la tâche */}
      <div
        className={`transition-all duration-300 
                      ${isFocused ? "scale-[1.01]" : "scale-100"}`}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Ajouter une nouvelle tâche..."
            className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 disabled:opacity-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={loading}
          />

          {/* Indicateur de caractères */}
          {name.length > 0 && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 animate-fade-in">
              {name.length}
            </div>
          )}
        </div>
      </div>

      {/* Grille des champs additionnels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Catégorie */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              Catégorie
            </span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 disabled:opacity-50"
          >
            <option value="">Aucune</option>
            <option value="Travail">💼 Travail</option>
            <option value="Personnel">🏠 Personnel</option>
            <option value="Santé">💪 Santé</option>
            <option value="Études">📚 Études</option>
            <option value="Autres">📌 Autres</option>
          </select>
        </div>

        {/* Date d'échéance */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Échéance
            </span>
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 disabled:opacity-50"
          />
        </div>

        {/* Priorité */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              Priorité
            </span>
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 disabled:opacity-50"
          >
            <option value="">Aucune</option>
            <option value="Haute">🔴 Haute</option>
            <option value="Moyenne">🟡 Moyenne</option>
            <option value="Basse">🟢 Basse</option>
          </select>
        </div>
      </div>

      {/* Bouton Ajouter */}
      <button
        type="submit"
        className={`w-full px-8 py-4 rounded-xl font-semibold text-white shadow-lg
                  transition-all duration-300 relative overflow-hidden group
                  ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-xl hover:-translate-y-0.5"
                  }
                  ${!name.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={loading || !name.trim()}
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 
                      group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-300"
        ></div>

        {/* Effet de brillance au hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                        transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700"
          ></div>
        </div>

        {/* Contenu du bouton */}
        <span className="relative flex items-center justify-center gap-2">
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Ajout en cours...</span>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Ajouter la tâche</span>
            </>
          )}
        </span>
      </button>

      {/* Conseil */}
      {isFocused && !loading && (
        <p className="text-sm text-gray-500 dark:text-gray-400 animate-fade-in text-center">
          💡 Astuce : Appuyez sur Entrée pour ajouter rapidement
        </p>
      )}
    </form>
  );
}
