// Composant Features pour présenter les fonctionnalités

export default function Features() {
  const features = [
    {
      icon: "🎨",
      title: "Design Moderne",
      description:
        "Interface élégante avec animations fluides et effets glassmorphism",
      gradient: "from-purple-500 to-blue-500",
    },
    {
      icon: "⚡",
      title: "Ultra Rapide",
      description:
        "Synchronisation instantanée avec Supabase pour une expérience fluide",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "🔒",
      title: "100% Sécurisé",
      description:
        "Vos données sont protégées avec authentification et chiffrement",
      gradient: "from-cyan-500 to-green-500",
    },
    {
      icon: "📱",
      title: "Responsive",
      description:
        "Utilisez l'app sur tous vos appareils, partout et à tout moment",
      gradient: "from-green-500 to-yellow-500",
    },
    {
      icon: "✨",
      title: "Gratuit",
      description:
        "Toutes les fonctionnalités sans limite, complètement gratuit",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: "🚀",
      title: "Productivité",
      description:
        "Organisez vos tâches et atteignez vos objectifs plus rapidement",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* En-tête */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block mb-4">
            <span
              className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 
                           border border-purple-500/20 text-sm font-medium"
            >
              ✨ Fonctionnalités
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Une application complète conçue pour vous aider à rester organisé et
            productif
          </p>
        </div>

        {/* Grille de fonctionnalités */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group card-premium hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icône avec gradient */}
              <div className="mb-4">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl 
                              bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 
                              transition-transform duration-300`}
                >
                  <span className="text-3xl filter drop-shadow-lg">
                    {feature.icon}
                  </span>
                </div>
              </div>

              {/* Contenu */}
              <h3 className="text-xl font-bold mb-2 group-hover:text-gradient-primary transition-all">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>

              {/* Ligne décorative avec gradient */}
              <div
                className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r 
                            from-purple-500 to-blue-500 rounded-full transition-all duration-500"
              ></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className="mt-20 text-center animate-fade-in-up"
          style={{ animationDelay: "600ms" }}
        >
          <div className="glass-strong rounded-3xl p-12 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à booster votre productivité ?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Rejoignez des milliers d'utilisateurs qui organisent leur vie avec
              notre app
            </p>
            <a
              href="/auth/signup"
              className="btn-gradient-primary inline-block group"
            >
              Commencer maintenant
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
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
