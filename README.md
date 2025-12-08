# 📝 Todo List App - Next.js & Supabase

<div align="center">

![Todo List Banner](https://img.shields.io/badge/Todo_List-App-blue?style=for-the-badge&logo=checkmarx&logoColor=white)

**Une application moderne de gestion de tâches construite avec Next.js 15 et Supabase**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-Components-5A0EF8?style=flat-square&logo=daisyui)](https://daisyui.com/)

[📖 Docs](#-documentation) • [🚀 Installation](#-installation) • [✨ Fonctionnalités](#-fonctionnalités) • [🏗️ Architecture](#-architecture)

</div>

---

## 🎯 À Propos

**Todo List App** est une application web moderne de gestion de tâches qui combine la puissance de Next.js 15 avec la flexibilité de Supabase. Elle offre une expérience utilisateur fluide avec authentification sécurisée, gestion en temps réel des tâches et une interface élégante construite avec Tailwind CSS v4 et DaisyUI.

### 🎨 Caractéristiques Principales

- ✅ **Gestion de Tâches Intuitive** - Créez, éditez et supprimez vos tâches facilement
- 🔐 **Authentification Sécurisée** - Système complet d'inscription et connexion via Supabase
- 🎭 **Interface Moderne** - Design élégant avec DaisyUI et thème "business"
- 📱 **Responsive Design** - Fonctionne parfaitement sur tous les appareils
- ⚡ **Temps Réel** - Synchronisation instantanée avec Supabase
- 🌐 **TypeScript** - Typage fort pour une meilleure expérience développeur
- 🎨 **Tailwind CSS v4** - Dernière version pour un styling performant
- 🚀 **Next.js 15** - Avec App Router et Server Components

---

## ✨ Fonctionnalités

### 🔒 Authentification

- **Inscription** : Création de compte avec email/mot de passe
- **Connexion** : Authentification sécurisée des utilisateurs
- **Déconnexion** : Gestion de session avec Supabase Auth
- **Protection des Routes** : Middleware (proxy) pour sécuriser les pages

### 📋 Gestion des Tâches

- **Créer** : Ajout de nouvelles tâches
- **Lire** : Affichage de toutes vos tâches
- **Modifier** : Édition du nom et du statut
- **Supprimer** : Suppression de tâches
- **Marquer comme complété** : Toggle du statut is_completed

### 🎨 Interface Utilisateur

- **Design Moderne** : Interface épurée avec DaisyUI
- **Thème Business** : Palette de couleurs professionnelle
- **Police Poppins** : Typographie moderne et élégante
- **Animations Fluides** : Transitions CSS pour une UX agréable
- **Cards & Badges** : Composants visuels attrayants

---

## 🏗️ Architecture

### 📁 Structure du Projet

```
todo-list-supabase/
├── 📂 app/                          # App Router de Next.js
│   ├── 📂 auth/                     # Routes d'authentification
│   │   ├── 📂 callback/
│   │   │   └── route.ts             # Gère le callback OAuth Supabase
│   │   ├── 📂 login/
│   │   │   └── page.tsx             # Page de connexion
│   │   └── 📂 signup/
│   │       └── page.tsx             # Page d'inscription
│   ├── 📂 todos/
│   │   └── page.tsx                 # Page principale (protégée)
│   ├── layout.tsx                   # Layout racine avec Poppins
│   ├── page.tsx                     # Page d'accueil
│   └── globals.css                  # Styles Tailwind v4 + DaisyUI
│
├── 📂 components/                   # Composants React réutilisables
│   ├── TodoList.tsx                 # Liste de todos
│   ├── TodoItem.tsx                 # Todo individuel
│   ├── AddTodoForm.tsx              # Formulaire d'ajout
│   └── Header.tsx                   # Header avec logout
│
├── 📂 lib/                          # Logique métier et utilitaires
│   ├── 📂 supabase/
│   │   ├── client.ts                # Client Supabase (côté client)
│   │   ├── server.ts                # Client Supabase (côté serveur)
│   │   ├── proxy.ts                 # Logique de protection (middleware)
│   │   └── database.types.ts        # Types générés depuis Supabase
│   └── types.ts                     # Types TypeScript personnalisés
│
├── proxy.ts                         # 🔒 Middleware de protection des routes
├── .env.local                       # Variables d'environnement
├── postcss.config.mjs               # Configuration PostCSS
├── tailwind.config.ts               # Configuration Tailwind CSS v4
├── next.config.mjs                  # Configuration Next.js
└── package.json                     # Dépendances du projet
```

### 🔄 Flow de l'Application

```
graph TD
    A[Utilisateur] -->|Accède à l'app| B{proxy.ts}
    B -->|Non authentifié| C[/auth/login]
    B -->|Authentifié| D[/todos]
    C -->|Se connecte| E[Supabase Auth]
    E -->|Callback| F[/auth/callback]
    F -->|Redirige| D
    D -->|CRUD| G[(Supabase DB)]
    G -->|Données| D
```

### 🗄️ Schéma de Base de Données

**Table : `todos`**

| Colonne        | Type      | Description                          |
| -------------- | --------- | ------------------------------------ |
| `id`           | UUID      | Identifiant unique (PK)              |
| `user_id`      | UUID      | Référence à auth.users (FK)          |
| `name`         | TEXT      | Nom de la tâche                      |
| `is_completed` | BOOLEAN   | Statut de complétion (défaut: false) |
| `created_at`   | TIMESTAMP | Date de création                     |

**Politiques RLS (Row Level Security)**

- ✅ Les utilisateurs peuvent voir uniquement leurs propres todos
- ✅ Les utilisateurs peuvent créer/modifier/supprimer leurs todos

---

## 🚀 Installation

### 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** : Version 18.17 ou supérieure ([Télécharger](https://nodejs.org/))
- **npm** ou **pnpm** : Gestionnaire de paquets
- **Git** : Pour cloner le repository
- **Compte Supabase** : [Créer un compte gratuit](https://supabase.com/)

### 📥 Étape 1 : Cloner le Repository

```bash
git clone https://github.com/Alberto-Kitenge/todo-list-supabase.git
cd todo-list-supabase
```

### 📦 Étape 2 : Installer les Dépendances

```bash
npm install
# ou
pnpm install
```

### 🔧 Étape 3 : Configuration Supabase

1. **Créer un nouveau projet sur Supabase**

   - Rendez-vous sur [supabase.com](https://supabase.com/)
   - Créez un nouveau projet

2. **Créer la table `todos`**

Exécutez ce SQL dans l'éditeur SQL de Supabase :

```sql
-- Créer la table todos
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Activer RLS (Row Level Security)
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Politique : Les utilisateurs peuvent voir leurs propres todos
CREATE POLICY "Users can view own todos"
  ON todos FOR SELECT
  USING (auth.uid() = user_id);

-- Politique : Les utilisateurs peuvent créer leurs propres todos
CREATE POLICY "Users can create own todos"
  ON todos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Politique : Les utilisateurs peuvent modifier leurs propres todos
CREATE POLICY "Users can update own todos"
  ON todos FOR UPDATE
  USING (auth.uid() = user_id);

-- Politique : Les utilisateurs peuvent supprimer leurs propres todos
CREATE POLICY "Users can delete own todos"
  ON todos FOR DELETE
  USING (auth.uid() = user_id);
```

3. **Récupérer les clés API**
   - Allez dans **Settings** → **API**
   - Copiez `Project URL` et `anon public` key

### 🔐 Étape 4 : Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

Remplacez les valeurs par celles de votre projet Supabase.

### ▶️ Étape 5 : Lancer l'Application

```bash
npm run dev
# ou
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur 🎉

---

## 📖 Documentation

### 🛠️ Technologies Utilisées

| Technologie      | Version | Description                 |
| ---------------- | ------- | --------------------------- |
| **Next.js**      | 15.x    | Framework React full-stack  |
| **TypeScript**   | 5.x     | Typage statique             |
| **Supabase**     | Latest  | Backend-as-a-Service (BaaS) |
| **Tailwind CSS** | 4.x     | Framework CSS utility-first |
| **DaisyUI**      | Latest  | Composants UI pour Tailwind |
| **Poppins**      | -       | Police Google Fonts         |

### 🔄 Gestion du State

- **Supabase Client** : Gestion du state côté client avec hooks React
- **Server Components** : Récupération de données côté serveur quand possible
- **Client Components** : Pour l'interactivité (marqué avec `"use client"`)

### 🔒 Sécurité

- **Proxy.ts** : Middleware Next.js pour protéger les routes
- **RLS Supabase** : Sécurité au niveau base de données
- **Variables d'environnement** : Clés API sécurisées

### 🎨 Styling

- **Tailwind CSS v4** : Dernière version avec fichier `@config` dans `globals.css`
- **DaisyUI** : Thème "business" pour un look professionnel
- **Police Poppins** : Importée via `next/font/google` avec optimisation automatique

---

## 🧪 Commandes Utiles

```bash
# Développement
npm run dev          # Lancer le serveur de développement

# Build
npm run build        # Construire pour la production
npm run start        # Lancer en mode production

# Linting
npm run lint         # Vérifier le code avec ESLint
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Si vous souhaitez améliorer ce projet :

1. **Fork** le projet
2. Créez une **branche** pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. **Commit** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une **Pull Request**

---

## 📄 License

Ce projet est distribué sous la licence **MIT**. Consultez le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👨‍💻 Auteur

**Alberto Kitenge**

- 🌐 GitHub : [@Alberto-Kitenge](https://github.com/Alberto-Kitenge)
- 📧 Email : [kitengewalberto@gmail.com](mailto:kitengewalberto@gmail.com)

---

## 🙏 Remerciements

- [Next.js Team](https://nextjs.org/) pour ce framework incroyable
- [Supabase](https://supabase.com/) pour le backend simplifié
- [Vercel](https://vercel.com/) pour l'hébergement
- [Tailwind CSS](https://tailwindcss.com/) et [DaisyUI](https://daisyui.com/) pour le styling

---

<div align="center">

**⭐ Si ce projet vous plaît, n'hésitez pas à lui donner une étoile ! ⭐**

Made with ❤️ by Alberto Kitenge

</div>
