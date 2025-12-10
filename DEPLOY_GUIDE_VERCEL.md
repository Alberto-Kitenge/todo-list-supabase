# Guide de Déploiement sur Vercel

Ce guide vous explique étape par étape comment déployer votre projet **Next.js + Supabase** sur [Vercel](https://vercel.com/).

## 1. Prérequis

- Un compte [Vercel](https://vercel.com/signup).
- Votre code doit être hébergé sur un dépôt Git (GitHub, GitLab ou Bitbucket).
- Avoir récupéré vos clés d'API Supabase (URL et clé Anonyme).

## 2. Préparation du projet

Assurez-vous que le fichier `vercel.json` est bien présent à la racine du projet (nous l'avons déjà créé).

Vérifiez que vos changements sont "committés" et "pushés" sur votre dépôt Git :

```bash
git add .
git commit -m "Préparation pour déploiement Vercel"
git push origin main
```

_(Remplacez `main` par le nom de votre branche principale si différent)._

## 3. Importer le projet dans Vercel

1.  Allez sur votre [Tableau de bord Vercel](https://vercel.com/dashboard).
2.  Cliquez sur le bouton **"Add New..."** puis sélectionnez **"Project"**.
3.  Dans la liste "Import Git Repository", trouvez votre dépôt `todo-list-supabase` et cliquez sur **"Import"**.

## 4. Configuration du déploiement

Vercel va détecter automatiquement qu'il s'agit d'un projet **Next.js**.

Dans la section **"Environment Variables"** (Variables d'environnement), vous devez ajouter les clés nécessaires pour que votre application puisse communiquer avec Supabase.

Ajoutez les variables suivantes (copiez les valeurs depuis votre fichier `.env.local` ou depuis votre dashboard Supabase) :

| Nom (Name)                             | Valeur (Value)                                         |
| :------------------------------------- | :----------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`             | Votre URL Supabase (ex: `https://xyz.supabase.co`)     |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Votre clé publique/anonyme (ex: `eyJhbGciOiJIUzI1...`) |

_(Cliquez sur "Add" après avoir rempli chaque ligne)._

> **Note :** Ne touchez pas aux "Build and Output Settings", Vercel les configure automatiquement pour Next.js. Notre fichier `vercel.json` s'occupera des en-têtes de sécurité supplémentaires.

## 5. Lancer le déploiement

1.  Une fois les variables ajoutées, cliquez sur le bouton **"Deploy"**.
2.  Vercel va lancer la construction (build) de votre site. Cela prend généralement une minute.
3.  Si tout se passe bien, vous verrez un écran de félicitations avec un aperçu de votre site.

## 6. Vérification

Cliquez sur l'image de l'aperçu ou sur le bouton **"Continue to Dashboard"** puis sur le lien de votre domaine (ex: `todo-list-supabase.vercel.app`).

- Vérifiez que la liste des tâches s'affiche (cela confirmera que la connexion Supabase fonctionne).
- Ouvrez les outils de développement du navigateur (F12) -> Onglet **Réseau (Network)**, cliquez sur une requête et vérifiez dans les **Headers** de réponse que les en-têtes de sécurité (comme `X-Frame-Options: DENY`) sont bien présents.

---

**Félicitations ! Votre application est en ligne. 🚀**
