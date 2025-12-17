# 🎓 Online Learning Platform - Frontend React

Frontend moderne en React + Vite pour la plateforme d'apprentissage en ligne.

## 🚀 Démarrage Rapide

```bash
# Installation des dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Accueil | `/` | Page d'accueil avec héro et cours populaires |
| Connexion | `/login` | Formulaire de connexion |
| Inscription | `/signup` | Formulaire d'inscription |
| Cours | `/courses` | Liste de tous les cours avec recherche |
| Détails Cours | `/courses/:id` | Détails d'un cours et inscription |
| Lecteur | `/learning/:id` | Lecteur vidéo YouTube avec stats |
| Professeurs | `/professors` | Liste des professeurs par spécialité |
| Mes Cours | `/student/dashboard` | Tableau de bord étudiant |
| Admin | `/admin/dashboard` | Gestion CRUD cours/professeurs |

## 🔧 Configuration

Le proxy API est configuré dans `vite.config.js` pour rediriger les requêtes `/api` vers le Gateway (port 8888).

## 🎨 Design

- **Theme**: Dark mode premium avec glassmorphism
- **Police**: Inter (Google Fonts)
- **Couleurs**: Gradient violet/cyan
- **Animations**: Transitions fluides et effets hover

## 📁 Structure

```
src/
├── components/    # Composants réutilisables (Navbar)
├── context/       # Context API (Auth, Toast)
├── pages/         # Pages de l'application
├── services/      # Services API
├── App.jsx        # Composant racine avec routing
├── App.css        # Styles de l'app
└── index.css      # Design system
```
