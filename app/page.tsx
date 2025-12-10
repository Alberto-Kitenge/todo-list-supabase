// Page d'accueil - Landing Page

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Si l'utilisateur est déjà connecté, rediriger vers /todos
  if (user) {
    redirect("/todos");
  }

  // Sinon, afficher la landing page
  return (
    <div className="min-h-screen">
      {/* Header de navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📝</span>
            <span className="text-xl font-bold text-gradient-primary">
              TodoList
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="px-6 py-2 text-sm font-medium hover:text-primary 
                       transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/auth/signup"
              className="btn btn-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              S&apos;inscrire
            </Link>
          </div>
        </nav>
      </header>

      {/* Sections principales */}
      <main>
        <Hero />
        <Features />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📝</span>
                <span className="text-xl font-bold text-gradient-primary">
                  TodoList
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Organisez vos tâches avec élégance et efficacité.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base-200 mb-4">Liens Rapides</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <Link
                    href="/auth/signup"
                    className="hover:text-primary transition-colors"
                  >
                    S&apos;inscrire
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/login"
                    className="hover:text-primary transition-colors"
                  >
                    Se connecter
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-base-200 mb-4">Technologie</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>Next.js 15</li>
                <li>Supabase</li>
                <li>Tailwind CSS</li>
                <li>TypeScript</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
            <p>Made with ❤️ by Alberto Kitenge • © 2025 TodoList App</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
