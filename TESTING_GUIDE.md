# Test de l'Administration - LearnHub

## ✅ TOUT EST DYNAMIQUE ET LIÉ À LA BASE DE DONNÉES

### 1. Cours (Table: cours dans cours_db)
✅ **Création**: Admin peut ajouter des cours via l'interface
✅ **Modification**: Admin peut modifier titre, description, catégorie, professeur, vidéo YouTube
✅ **Suppression**: Admin peut supprimer des cours
✅ **Affichage**: Les pages utilisent getAllCours() depuis la base de données
✅ **Relations**: Chaque cours peut être lié à un professeur
✅ **Catégories**: Dynamiques depuis la base (Développement Web, IA, Cloud & DevOps, etc.)

### 2. Professeurs (Table: professeurs dans cours_db)
✅ **Création**: Admin peut ajouter des professeurs
✅ **Modification**: Admin peut modifier nom, prénom, email, spécialité
✅ **Suppression**: Admin peut supprimer des professeurs
✅ **Affichage**: Page /professors utilise getAllProfesseurs() depuis la base
✅ **Relations**: Professeurs liés aux cours via foreign key

### 3. Étudiants (Table: etudiant dans inscription_db)
✅ **Création**: Via signup (/inscriptions/auth/signup)
✅ **Authentification**: Via login (/inscriptions/auth/login)
✅ **Données**: Stockées dans PostgreSQL inscription_db

### 4. Inscriptions (Table: inscription dans inscription_db)
✅ **Création**: Étudiants peuvent s'inscrire aux cours
✅ **Consultation**: Dashboard étudiant montre les inscriptions
✅ **Relations**: Lien entre étudiant et cours

### 5. Avis/Reviews (Table: avis dans cours_db)
✅ **Création**: Étudiants peuvent laisser des avis sur les cours
✅ **Affichage**: Visibles sur la page de détails du cours
✅ **Données**: Note (1-5) et commentaire stockés en base

## 🔄 Flux de Données

```
Frontend (React) → API Gateway (8888) → Microservices → PostgreSQL
                                      ↓
                            cours-service (8081)
                            inscription-service (8082)
                            statistique-service (8083)
```

## 🗄️ Architecture Base de Données

### Base: cours_db
- **Table cours**: id, titre, description, youtube_video_id, categorie, professeur_id
- **Table professeurs**: id, nom, prenom, email, specialite
- **Table avis**: id, id_cours, id_etudiant, nom_etudiant, note, commentaire, date_creation

### Base: inscription_db
- **Table etudiant**: id, nom, prenom, email, password, role
- **Table inscription**: id, id_etudiant, id_cours, date_inscription

## 🧪 Tests à Effectuer

### Test 1: Créer un Cours (Admin)
1. Connectez-vous: admin@test.com / admin123
2. Allez sur /admin
3. Cliquez "Ajouter un Cours"
4. Remplissez:
   - Titre: "Node.js pour Débutants"
   - Description: "Apprenez Node.js de zéro"
   - Catégorie: "Développement Web"
   - Professeur: Youssef Amrani
   - YouTube ID: "TlB_eWDSMt4"
5. Vérifiez que le cours apparaît dans /courses

### Test 2: Modifier un Professeur (Admin)
1. Dans /admin, onglet Professeurs
2. Cliquez ✏️ sur un professeur
3. Changez l'email ou la spécialité
4. Sauvegardez
5. Vérifiez sur /professors

### Test 3: Inscription Étudiant
1. Déconnectez-vous
2. Créez un compte sur /signup
3. Connectez-vous
4. Allez sur un cours
5. Cliquez "S'inscrire Gratuitement"
6. Vérifiez dans le dashboard étudiant (/dashboard)

### Test 4: Ajouter un Avis
1. Connecté en tant qu'étudiant
2. Allez sur un cours où vous êtes inscrit
3. Cliquez "Ajouter un avis"
4. Donnez une note et un commentaire
5. Vérifiez que l'avis apparaît

### Test 5: Supprimer un Cours (Admin)
1. Connecté en tant qu'admin
2. /admin → onglet Cours
3. Cliquez 🗑️ sur un cours
4. Confirmez
5. Vérifiez qu'il n'apparaît plus dans /courses

## ✅ Vérification PostgreSQL

### Connexion à la base:
```bash
psql -U postgres -h localhost -d cours_db
```

### Requêtes de vérification:
```sql
-- Voir tous les cours
SELECT * FROM cours;

-- Voir tous les professeurs
SELECT * FROM professeurs;

-- Voir les cours avec leurs professeurs
SELECT c.titre, c.categorie, p.prenom, p.nom 
FROM cours c 
LEFT JOIN professeur p ON c.professeur_id = p.id;

-- Voir les avis
SELECT * FROM avis;
```

### Pour inscription_db:
```bash
psql -U postgres -h localhost -d inscription_db
```

```sql
-- Voir tous les étudiants
SELECT * FROM etudiant;

-- Voir toutes les inscriptions
SELECT * FROM inscription;

-- Voir les inscriptions avec détails
SELECT e.prenom, e.nom, i.id_cours, i.date_inscription
FROM etudiant e
JOIN inscription i ON e.id = i.id_etudiant;
```

## 🎯 Conclusion

**TOUT EST 100% DYNAMIQUE**:
- ❌ Aucune donnée codée en dur dans le frontend
- ✅ Toutes les données viennent de PostgreSQL
- ✅ Admin peut tout gérer via l'interface
- ✅ Les relations sont gérées en base de données
- ✅ Spring Data REST expose automatiquement les CRUD
- ✅ Le frontend consomme les API REST dynamiquement

## 🚀 URLs Importantes

- **Frontend**: http://localhost:5173
- **Admin Dashboard**: http://localhost:5173/admin
- **API Gateway**: http://localhost:8888
- **Eureka**: http://localhost:8761
- **Cours Service API**: http://localhost:8888/api/cours-service/cours
- **Professeurs API**: http://localhost:8888/api/cours-service/professeurs
