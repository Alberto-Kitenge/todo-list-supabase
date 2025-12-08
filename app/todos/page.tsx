// Page principale des todos (protégée)

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import TodoList from "@/components/TodoList";
import AddTodoForm from "@/components/AddTodoForm";

export const dynamic = "force-dynamic";

export default async function TodosPage() {
  const supabase = await createClient();

  // Vérifier l'authentification
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Récupérer les todos de l'utilisateur
  const { data: todos, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching todos:", error);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />

      <main className="flex-1 container mx-auto max-w-4xl p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Mes Tâches</h1>
            <p className="text-base-content/60">
              Organisez vos tâches efficacement
            </p>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <AddTodoForm />
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <TodoList todos={todos || []} />
            </div>
          </div>
        </div>
      </main>

      <footer className="footer footer-center p-4 bg-base-200 text-base-content">
        <aside>
          <p>Todo List App - Propulsé par Next.js + Supabase</p>
        </aside>
      </footer>
    </div>
  );
}
