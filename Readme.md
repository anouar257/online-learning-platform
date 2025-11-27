
## Online Learning Platform
Description : Plateforme de gestion des cours, professeurs et étudiants basée sur une architecture microservices. Stack : Java 17, Spring Boot 3, Spring Cloud.

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

## ✅ cours-service (Port 8081) est RÉEL
   • Pourquoi ? Il n'utilise pas de fausses données "en dur" dans le contrôleur. Il utilise Spring Data REST connecté à une vraie base de données en mémoire (H2).
   • Preuve : Tu accèdes à tes données via des endpoints standardisés (/cours) générés automatiquement par Spring sur tes entités.
## ✅ inscription-service (Port 8082) est RÉEL
   • Pourquoi ? Il ne "devine" pas les infos du cours. Il effectue une vraie requête HTTP vers le cours-service via OpenFeign pour récupérer les données fraîches.
   • Preuve : Quand tu l'interroges, il t'affiche le titre du cours qui se trouve dans l'autre service. Si tu changes le titre dans cours-service, inscription-service verra le changement.
## ✅ statistique-service (Port 8083) est RÉEL (Le plus important !)
   • Pourquoi ? C'est la plus grande réussite. Tu as remplacé l'API de test (jsonplaceholder) par la vraie API YouTube Data v3 de Google. Tu utilises une vraie clé API que tu as générée sur Google Cloud Console.
   • Preuve : Quand tu lui donnes un vrai ID de vidéo YouTube, il utilise WebClient pour interroger les serveurs de Google en Californie et te ramener le nombre exact de vues et de likes en temps réel. Ce n'est plus une simulation.
   Conclusion : Ton projet est fonctionnel et respecte des standards professionnels d'architecture microservices. Tu peux être fier de ton travail !


## 🚀 Liens de Test Rapides

Copiez-collez ces liens pour tester vos services.

### 1. Cours Service (Backend Données)
*   **Liste des cours (JSON) :** `http://localhost:8081/cours`
*   **But :** Voir les données brutes stockées dans la base H2.

### 2. Inscription Service (Consommateur)
*   **Cours disponibles (via Feign) :** `http://localhost:8082/inscriptions/test-cours/1`
*   **But :** Vérifier que le service Inscription arrive bien à discuter avec le service Cours.

### 3. Statistique Service (YouTube API)
*   **Recherche JSON (Données brutes) :**
    `http://localhost:8083/stats/dQw4w9WgXcQ`.
*.
* exemple:
* juste id=dQw4w9WgXcQ (youtube)
## 📝 Commandes Utiles

**Lordre de démarrage recommandé :**

1. `CoursServiceApplication`
2. `InscriptionServiceApplication`
3. `StatistiqueServiceApplication`
