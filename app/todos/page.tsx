// Page principale des todos (protégée) avec design premium

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
    .order("is_completed", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching todos:", error);
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background moderne avec gradient animé */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 
                      dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20"
        ></div>
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full 
                        blur-3xl animate-pulse"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full 
                        blur-3xl animate-pulse"
            style={{ animationDuration: "6s", animationDelay: "2s" }}
          ></div>
        </div>
        {/* Motif de points */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <Header user={user} />

      <main className="flex-1 container mx-auto max-w-4xl px-6 py-8">
        <div className="space-y-8 animate-fade-in-up">
          {/* En-tête de la page */}
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-3">
              <span className="text-gradient-primary">Mes Tâches</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Organisez votre journée et atteignez vos objectifs ✨
            </p>
          </div>

          {/* Carte du formulaire d'ajout */}
          <div
            className="card-glass animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <AddTodoForm />
          </div>

          {/* Carte de la liste des todos */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <TodoList todos={todos || []} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 
                       border-t border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
      >
        <p>
          Todo List App - Propulsé par{" "}
          <span className="font-semibold text-gradient-primary">
            Next.js + Supabase
          </span>
        </p>
      </footer>
    </div>
  );
}
