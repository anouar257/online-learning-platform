# 🎓 LearnHub - Plateforme d'Apprentissage en Ligne

Plateforme moderne de gestion de cours en ligne avec architecture microservices, permettant aux étudiants de s'inscrire à des cours, de visionner des vidéos, et aux administrateurs de gérer l'ensemble du contenu de manière dynamique.

---

## 📸 Captures d'Écran

![](screenshots/Screenshot%202025-12-17%20235901.png)
![](screenshots/Screenshot%202025-12-17%20235940.png)
![](screenshots/Screenshot%202025-12-18%20000002.png)
![](screenshots/Screenshot%202025-12-18%20000020.png)
![](screenshots/Screenshot%202025-12-18%20000123.png)
![](screenshots/Screenshot%202025-12-18%20000146.png)
![](screenshots/Screenshot%202025-12-18%20000219.png)
![](screenshots/Screenshot%202025-12-18%20000251.png)
![](screenshots/Screenshot%202025-12-18%20000407.png)
![](screenshots/Screenshot%202025-12-18%20000452.png)
![](screenshots/Screenshot%202025-12-18%20000513.png)
![](screenshots/Screenshot%202025-12-18%20001817.png)

---

## 📦 Technologies utilisées

| Technologie | Version | Rôle |
| :--- | :--- | :--- |
| **Java** | JDK 17 | Backend services |
| **Spring Boot** | 3.2.0 | Framework principal |
| **Spring Data JPA** | 3.2.0 | Gestion des données |
| **Spring Data REST** | 3.2.0 | API REST automatique |
| **Spring Cloud OpenFeign** | 4.1.0 | Communication inter-services |
| **Spring Cloud Gateway** | 4.1.0 | API Gateway réactive |
| **Netflix Eureka** | 4.1.0 | Service Discovery |
| **Maven** | 3.x | Build et dépendances |
| **PostgreSQL** | 15+ | Base de données relationnelle |
| **React** | 18 | Frontend moderne |
| **Vite** | 7.2.5 | Build tool rapide |
| **React Router** | 6 | Navigation SPA |

---

## 🏗️ Architecture Microservices

| Service | Port | Description | Base de données |
| :--- | :--- | :--- | :--- |
| **Discovery Service** | 8761 | Eureka - Registre des services | - |
| **Gateway Service** | 8888 | Point d'entrée unique avec CORS | - |
| **Cours Service** | 8081 | Gestion cours, professeurs, avis | cours_db (PostgreSQL) |
| **Inscription Service** | 8082 | Gestion étudiants et inscriptions | inscription_db (PostgreSQL) |
| **Statistique Service** | 8083 | Statistiques et analytics | - |
| **Frontend React** | 5173 | Interface utilisateur moderne | - |

---

## 🚀 Guide de Démarrage

### Prérequis
- **Java JDK 17** ou supérieur
- **Maven 3.x** 
- **Node.js 18+** et **npm**
- **PostgreSQL 15+** avec:
  - Utilisateur: `postgres`
  - Mot de passe: `odoo`
  - Bases: `cours_db` et `inscription_db` (créées automatiquement)

### Étape 1 : Configurer PostgreSQL

```bash
# Vérifier que PostgreSQL est démarré
# Les bases de données seront créées automatiquement au premier lancement
```

### Étape 2 : Lancer les Services Backend (⚠️ ORDRE IMPORTANT)

**Option A - Lancement manuel (6 terminaux):**

```bash
# Terminal 1 - Discovery Service (LANCER EN PREMIER, attendre 20s)
cd backend/discovery-service
mvn spring-boot:run

# Terminal 2 - Gateway Service (attendre 15s après Discovery)
cd backend/gateway-service
mvn spring-boot:run

# Terminal 3 - Inscription Service (attendre 10s après Gateway)
cd backend/inscription-service
mvn clean package -DskipTests
cd target
java -jar inscription-service-0.0.1-SNAPSHOT.jar

# Terminal 4 - Cours Service (attendre 10s après Inscription)
cd backend/cours-service
mvn spring-boot:run

# Terminal 5 - Statistique Service (attendre 10s après Cours)
cd backend/statistique-service
mvn spring-boot:run

# Terminal 6 - Frontend React (attendre 5s après Statistique)
cd frontend
npm install  # (première fois seulement)
npm run dev
```

**Option B - Lancement automatique (PowerShell Windows):**

```powershell
# Copier-coller ce script dans PowerShell
cd C:\Users\<VOTRE_USER>\Desktop\online-learning-platform

# Arrêter tous les services existants
Get-Process | Where-Object {$_.ProcessName -eq 'java' -or $_.ProcessName -eq 'node'} | Stop-Process -Force

# Lancer Discovery
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend\discovery-service; mvn spring-boot:run" -WindowStyle Minimized
Start-Sleep -Seconds 20

# Lancer Gateway
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend\gateway-service; mvn spring-boot:run" -WindowStyle Minimized
Start-Sleep -Seconds 15

# Lancer Inscription
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend\inscription-service\target; java -jar inscription-service-0.0.1-SNAPSHOT.jar" -WindowStyle Minimized
Start-Sleep -Seconds 10

# Lancer Cours
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend\cours-service; mvn spring-boot:run" -WindowStyle Minimized
Start-Sleep -Seconds 10

# Lancer Statistique
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend\statistique-service; mvn spring-boot:run" -WindowStyle Minimized
Start-Sleep -Seconds 10

# Lancer Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev" -WindowStyle Minimized
```

---

## 🔗 Accès à l'Application

| Service | URL | Description |
| :--- | :--- | :--- |
| **🌐 Application Web** | http://localhost:5173 | Interface utilisateur principale |
| **📊 Eureka Dashboard** | http://localhost:8761 | Tableau de bord des services |
| **🔌 API Gateway** | http://localhost:8888 | Point d'entrée des API |
| **📚 API Cours** | http://localhost:8081/cours | Liste des cours (JSON) |
| **👥 API Étudiants** | http://localhost:8082/etudiants | Liste des étudiants (JSON) |
| **📈 API Stats** | http://localhost:8083/stats | Statistiques (JSON) |

---

## 👤 Comptes de Test

### Compte Administrateur
- **Email:** anouarmountade@gmail.com
- **Mot de passe:** anouar
- **Rôle:** ADMIN
- **Accès:** Dashboard admin complet (gestion cours, professeurs, catégories)

### Création de Comptes Étudiants
Les étudiants doivent créer leurs comptes via le formulaire d'inscription sur l'interface web.

---

## ✅ Vérification du Bon Fonctionnement

### Script de Vérification (PowerShell)

```powershell
# Vérifier que tous les services sont démarrés
$services = @(@{Name="Discovery";Port=8761}, @{Name="Gateway";Port=8888}, @{Name="Inscription";Port=8082}, @{Name="Cours";Port=8081}, @{Name="Statistique";Port=8083}, @{Name="Frontend";Port=5173})

foreach($s in $services) {
    $conn = Test-NetConnection -ComputerName localhost -Port $s.Port -WarningAction SilentlyContinue -InformationLevel Quiet
    if($conn) {
        Write-Host "✅ $($s.Name) - Port $($s.Port) - RUNNING" -ForegroundColor Green
    } else {
        Write-Host "❌ $($s.Name) - Port $($s.Port) - NOT RUNNING" -ForegroundColor Red
    }
}
```

### Vérification PostgreSQL

```bash
# Vérifier le compte admin
psql -U postgres -h localhost -d inscription_db -c "SELECT email, role FROM etudiant WHERE role='ADMIN';"

# Résultat attendu:
#          email           | role
# -------------------------+-------
#  anouarmountade@gmail.com | ADMIN
```

---

## 🎯 Fonctionnalités Principales

### Pour les Étudiants
- ✅ Inscription et authentification
- ✅ Navigation et recherche de cours
- ✅ Consultation des détails des cours
- ✅ Inscription aux cours
- ✅ Lecture de vidéos de cours
- ✅ Consultation des professeurs
- ✅ Soumission d'avis sur les cours

### Pour les Administrateurs
- ✅ Dashboard d'administration complet
- ✅ Gestion CRUD des cours (Créer, Lire, Modifier, Supprimer)
- ✅ Gestion CRUD des professeurs
- ✅ Attribution de catégories aux cours
- ✅ Affectation de professeurs aux cours
- ✅ Gestion dynamique depuis la base de données
- ✅ Interface intuitive avec formulaires

---

## 🛠️ Technologies Détaillées

### Backend (Spring Boot Microservices)
- **Spring Data JPA:** ORM avec Hibernate pour PostgreSQL
- **Spring Data REST:** Génération automatique d'API RESTful
- **Spring Cloud Gateway:** Gateway réactive avec WebFlux
- **Netflix Eureka:** Service discovery et load balancing
- **OpenFeign:** Client HTTP déclaratif pour communication inter-services
- **CORS:** Configuration multi-origin (ports 5173, 4400, 4200)

### Frontend (React)
- **React Router:** Navigation SPA multi-pages
- **Context API:** Gestion d'état (Auth, Toast)
- **Axios:** Client HTTP pour API calls
- **CSS Modules:** Styles componentisés
- **Vite:** Build ultra-rapide avec HMR

### Base de Données (PostgreSQL)
- **cours_db:** Cours, Professeurs, Catégories, Avis
- **inscription_db:** Étudiants, Inscriptions, Authentification
- **Relations:** ManyToOne (Cours→Professeur), ManyToMany (via Inscription)

---

## 🛑 Arrêter les Services

**Option 1 - Arrêt manuel:**
Appuyez sur `Ctrl+C` dans chaque terminal.

**Option 2 - Arrêt automatique (PowerShell):**
```powershell
Get-Process | Where-Object {$_.ProcessName -eq 'java' -or $_.ProcessName -eq 'node'} | Stop-Process -Force
```

**Ordre recommandé:**
1. Frontend → 2. Statistique → 3. Cours → 4. Inscription → 5. Gateway → 6. Discovery

---

## 📝 Notes Importantes

- ✅ **PostgreSQL** requis (user: postgres, password: odoo)
- ✅ **Bases créées automatiquement:** cours_db, inscription_db
- ✅ **Discovery doit démarrer en premier** (attendre 20s)
- ✅ **Compte admin:** anouarmountade@gmail.com / anouar
- ✅ **Frontend:** http://localhost:5173
- ✅ **CORS configuré** pour ports 5173, 4400, 4200

---

## 👨‍💻 Auteur

**Anouar Mountade** - anouarmountade@gmail.com
