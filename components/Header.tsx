// Header avec logout et design premium

"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { useState, useRef, useEffect } from "react";

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  // Fermer le menu au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  // Obtenir les initiales de l'utilisateur
  const getUserInitials = () => {
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <header className="sticky top-0 z-40 glass-strong border-b border-gray-200/50 dark:border-gray-700/50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 group">
            <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
              📝
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient-primary">
                TodoList
              </h1>
              <p className="text-xs text-base-content/70">
                Par Alberto Kitenge
              </p>
            </div>
          </div>

          {/* Menu utilisateur */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:text-base-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
            >
              {/* Avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {getUserInitials()}
                </div>
                {/* Indicateur en ligne */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
              </div>

              {/* Info utilisateur */}
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold">{user.email}</p>
                <p className="text-xs">Compte actif</p>
              </div>

              {/* Icône chevron */}
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-300
                          ${isMenuOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Menu déroulant */}
            {isMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-64 glass-strong rounded-2xl shadow-xl
                            border border-gray-200 dark:border-gray-700 overflow-hidden
                            animate-fade-in-down"
              >
                {/* Profil */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900">
                    Connecté en tant que :
                  </p>
                  <p className="text-sm text-primary font-semibold mt-1">
                    {user.email}
                  </p>
                </div>

                {/* Actions */}
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 group"
                  >
                    <svg
                      className="w-5 h-5 group-hover:scale-110 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="font-medium">Se déconnecter</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
