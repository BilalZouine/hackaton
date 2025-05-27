# ReservaLoc - Frontend Next.js

## 🚀 Installation

\`\`\`bash
# Cloner le projet
git clone <votre-repo>
cd reservaloc-frontend

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
npm start
\`\`\`

## 📁 Structure du projet

\`\`\`
app/
├── page.tsx              # Page d'accueil
├── login/page.tsx        # Connexion
├── register/page.tsx     # Inscription
├── categories/page.tsx   # Catégories de locaux
├── locaux/page.tsx       # Liste des locaux
├── dashboard/page.tsx    # Dashboard utilisateur
├── admin/page.tsx        # Dashboard admin
├── layout.tsx            # Layout principal
└── globals.css           # Styles globaux

components/ui/
├── button.tsx            # Composant bouton
├── card.tsx              # Composant carte
├── input.tsx             # Composant input
├── label.tsx             # Composant label
├── badge.tsx             # Composant badge
├── tabs.tsx              # Composant onglets
├── select.tsx            # Composant select
└── table.tsx             # Composant tableau

lib/
└── utils.ts              # Utilitaires
\`\`\`

## 🎨 Fonctionnalités

- ✅ **Interface moderne** avec Tailwind CSS
- ✅ **Composants UI** shadcn/ui
- ✅ **Authentification QR Code** simulée
- ✅ **Dashboard utilisateur** complet
- ✅ **Panel admin** avec gestion
- ✅ **Responsive design** mobile/desktop
- ✅ **Navigation intuitive**
- ✅ **Système de réservation** interactif

## 🔧 Technologies

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS
- **shadcn/ui** - Composants UI
- **Lucide React** - Icônes
- **Radix UI** - Primitives accessibles

## 📱 Pages disponibles

- `/` - Page d'accueil
- `/login` - Connexion (email + QR Code)
- `/register` - Inscription
- `/categories` - Catégories de locaux
- `/locaux` - Liste des locaux avec filtres
- `/dashboard` - Dashboard utilisateur
- `/admin` - Dashboard administrateur

## 🎯 Comptes de test

- **Admin**: admin@reservaloc.com / password
- **Client**: client@test.com / password

## 🚀 Déploiement

\`\`\`bash
# Build
npm run build

# Démarrer
npm start
\`\`\`

Prêt pour le **Hackathon OFPPT 2025** ! 🏆
