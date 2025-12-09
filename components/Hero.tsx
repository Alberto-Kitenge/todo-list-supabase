// Composant Hero pour la landing page

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background avec gradient animé */}
      <div className="absolute inset-0 gradient-animated opacity-20 -z-10"></div>

      {/* Pattern de fond */}
      <div className="absolute inset-0 opacity-10 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu texte */}
          <div
            className={`space-y-8 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <div className="inline-block">
              <span
                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 
                             border border-purple-500/30 text-sm font-medium backdrop-blur-sm"
              >
                ✨ Organisez votre vie facilement
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Gérez vos tâches
              <span className="block text-gradient-primary mt-2">
                avec style
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl">
              Une application moderne de gestion de tâches qui combine élégance
              et efficacité. Restez organisé et productif au quotidien.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/signup"
                className="btn-gradient-primary text-center group"
              >
                Commencer gratuitement
                <svg
                  className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>

              <Link
                href="/auth/login"
                className="px-8 py-3 rounded-lg font-semibold border-2 border-gray-300 dark:border-gray-600 
                         hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400
                         transition-all duration-300 text-center"
              >
                Se connecter
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div>
                <div className="text-3xl font-bold text-gradient-primary">
                  100%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Gratuit
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient-primary">
                  ∞
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Tâches
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient-primary">
                  ⚡
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Rapide
                </div>
              </div>
            </div>
          </div>

          {/* Illustration/Visual */}
          <div
            className={`relative ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "200ms" }}
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Card de démonstration avec effet glass */}
              <div
                className="absolute top-1/4 left-1/4 w-3/4 glass-strong rounded-2xl p-6 shadow-2xl 
                            hover-lift transform rotate-3"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-4/6"></div>
                </div>
              </div>

              {/* Card de démonstration 2 */}
              <div
                className="absolute top-1/2 right-1/4 w-2/3 glass rounded-2xl p-4 shadow-xl 
                            hover-lift transform -rotate-6"
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded flex-1"></div>
                </div>
              </div>

              {/* Éléments décoratifs flottants */}
              <div
                className="absolute top-0 right-0 w-20 h-20 bg-purple-500 rounded-full 
                            opacity-20 blur-2xl animate-pulse"
              ></div>
              <div
                className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 rounded-full 
                            opacity-20 blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
