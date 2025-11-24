# Online Learning Platform

**Description :** Plateforme de gestion des cours, professeurs et étudiants basée sur une architecture microservices.
**Stack :** Java 17, Spring Boot 3, Spring Cloud.

---

## Fonctionnalités

Le projet est composé de trois microservices interconnectés :

### 1. Service Cours (`cours-service`)
- **Technologie :** Spring Data REST
- **Rôle :** Exposition automatique et rapide des entités (Cours, Professeurs, etc.) via une API RESTful .

### 2. Service Inscription (`inscription-service`)
- **Technologie :** Spring Cloud OpenFeign
- **Rôle :** Gestion des inscriptions. Utilise un client HTTP déclaratif (Feign) pour communiquer de manière synchrone avec le `cours-service` afin de récupérer les détails des cours.

### 3. Service Statistique (`statistique-service`)
- **Technologie :** Spring WebFlux (WebClient) & API YouTube Data v3
- **Rôle :** Récupération en temps réel de données externes (vues, likes) sur les vidéos YouTube liées aux cours via un client réactif non-bloquant.

---

## Technologies utilisées

| Technologie | Détails / Rôle |
| :--- | :--- |
| **Java** | JDK 17 |
| **Spring Boot** | Framework principal (v3.x) |
| **Spring Data REST** | Exposition d'API rapide |
| **Spring Cloud OpenFeign**| Communication inter-services |
| **Spring WebFlux** | Client HTTP réactif (WebClient) |
| **Maven** | Gestion des dépendances et Build |
| **H2 Database** | Base de données en mémoire (Dev) |
| **API YouTube** | Source de données externe |

---

## Prérequis

Avant de lancer le projet, assurez-vous d'avoir :

- **Java JDK 17** installé.
- **Git** installé.
- **Maven** installé (ou utiliser le wrapper `mvnw` inclus).
- Une **Clé API YouTube Data v3** valide (nécessaire pour le service statistique).

---

## Captures d’écran

<div align="center">

### Vue globale du projet (IDE)
<img src="chemin/vers/votre_screen_ide_structure.png" alt="Structure du projet IntelliJ" width="800"/>
<br><br>

### Exemple : API Cours (Data REST)
<img src="chemin/vers/votre_screen_api_cours.png" alt="Browser API Cours" width="800"/>
<br><br>

### Exemple : Réponse Stats YouTube (WebClient)
<img src="chemin/vers/votre_screen_api_stats.png" alt="Browser API Stats" width="800"/>

</div>

---

## Installation & Lancement

### 1. Cloner le projet

```bash

git clone [https://github.com/VOTRE-NOM/online-learning-platform.git](https://github.com/VOTRE-NOM/online-learning-platform.git)
cd online-learning-platform
