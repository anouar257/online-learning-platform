# Guide d'Administration - LearnHub

## 🎯 Fonctionnalités Admin

Le tableau de bord admin permet de gérer de manière dynamique tous les aspects de la plateforme directement depuis la base de données PostgreSQL.

## 📚 Gestion des Cours

### Créer un cours
1. Connectez-vous en tant qu'admin (admin@test.com / admin123)
2. Accédez au tableau de bord admin
3. Cliquez sur l'onglet "📚 Cours"
4. Cliquez sur "+ Ajouter un Cours"
5. Remplissez le formulaire :
   - **Titre** : Nom du cours
   - **Description** : Description détaillée
   - **Catégorie** : Sélectionnez une catégorie
   - **Professeur** : Associez un professeur (optionnel)
   - **ID Vidéo YouTube** : L'ID de la vidéo (exemple: pour https://youtube.com/watch?v=ABC123, l'ID est ABC123)

### Modifier un cours
1. Cliquez sur le bouton ✏️ dans la colonne Actions
2. Modifiez les informations
3. Cliquez sur "Modifier"

### Supprimer un cours
1. Cliquez sur le bouton 🗑️ dans la colonne Actions
2. Confirmez la suppression

## 👨‍🏫 Gestion des Professeurs

### Créer un professeur
1. Cliquez sur l'onglet "👨‍🏫 Professeurs"
2. Cliquez sur "+ Ajouter un Professeur"
3. Remplissez le formulaire :
   - **Prénom** : Prénom du professeur
   - **Nom** : Nom du professeur
   - **Email** : Email professionnel
   - **Spécialité** : Domaine d'expertise

### Modifier un professeur
1. Cliquez sur le bouton ✏️ dans la colonne Actions
2. Modifiez les informations
3. Cliquez sur "Modifier"

### Supprimer un professeur
1. Cliquez sur le bouton 🗑️ dans la colonne Actions
2. Confirmez la suppression
⚠️ Note: La suppression d'un professeur affecte les cours associés

## 🔄 Tout est Dynamique

### ✅ Données en temps réel
- Toutes les modifications sont immédiatement enregistrées dans PostgreSQL
- Aucune donnée n'est codée en dur dans le frontend
- Les relations entre cours et professeurs sont gérées par la base de données

### ✅ Relations automatiques
- Un cours peut être associé à un professeur
- Les catégories permettent de regrouper les cours
- Les modifications sont propagées automatiquement

### ✅ API REST complète
Tous les endpoints CRUD sont disponibles via Spring Data REST:
- `GET /cours` - Liste tous les cours
- `POST /cours` - Créer un cours
- `PUT /cours/{id}` - Modifier un cours
- `DELETE /cours/{id}` - Supprimer un cours
- `GET /professeurs` - Liste tous les professeurs
- `POST /professeurs` - Créer un professeur
- `PUT /professeurs/{id}` - Modifier un professeur
- `DELETE /professeurs/{id}` - Supprimer un professeur

## 🎨 Catégories disponibles
- Développement Web
- Intelligence Artificielle
- Cloud & DevOps
- Mobile
- Data Science
- Sécurité

## 🔐 Accès Admin

Pour accéder au tableau de bord admin:
1. URL: http://localhost:5173/admin
2. Identifiants admin:
   - Email: admin@test.com
   - Mot de passe: admin123

## 🗄️ Structure de la Base de Données

### Table: cours
- id (BIGINT, PRIMARY KEY)
- titre (VARCHAR)
- description (TEXT)
- youtube_video_id (VARCHAR)
- categorie (VARCHAR)
- professeur_id (BIGINT, FOREIGN KEY → professeurs.id)

### Table: professeurs
- id (BIGINT, PRIMARY KEY)
- nom (VARCHAR)
- prenom (VARCHAR)
- email (VARCHAR)
- specialite (VARCHAR)

### Table: avis
- id (BIGINT, PRIMARY KEY)
- id_cours (BIGINT)
- id_etudiant (BIGINT)
- nom_etudiant (VARCHAR)
- note (INTEGER)
- commentaire (TEXT)
- date_creation (VARCHAR)

## 🚀 Services Backend

### cours-service (Port 8081)
- Gestion des cours, professeurs et avis
- Base de données: cours_db (PostgreSQL)
- API REST avec Spring Data REST

### inscription-service (Port 8082)
- Gestion des étudiants et inscriptions
- Base de données: inscription_db (PostgreSQL)

### statistique-service (Port 8083)
- Statistiques et analytics
- Consommation des données via WebClient

## 📊 Base de Données PostgreSQL

**Host**: localhost
**Port**: 5432
**Databases**:
- cours_db (user: postgres, password: odoo)
- inscription_db (user: postgres, password: odoo)

## ✨ Fonctionnalités Futures

- Upload d'images pour les cours
- Gestion des chapitres et sections
- Quiz et examens
- Certificats
- Système de notation avancé
- Tableau de bord statistiques temps réel
