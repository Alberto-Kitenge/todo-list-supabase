// Formulaire ajout todo

"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AddTodoForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
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
      const { error } = await supabase.from("todos").insert([
        {
          name: name.trim(),
          user_id: user.id,
          is_completed: false,
        },
      ]);

      if (!error) {
        setName("");
        router.refresh();
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Ajouter une nouvelle tâche..."
        className="input input-bordered flex-1"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className={`btn btn-primary ${loading ? "loading" : ""}`}
        disabled={loading || !name.trim()}
      >
        {loading ? "" : "Ajouter"}
      </button>
    </form>
  );
}
