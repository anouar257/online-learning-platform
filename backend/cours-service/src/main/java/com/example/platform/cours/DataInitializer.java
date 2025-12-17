package com.example.platform.cours;

import com.example.platform.cours.entities.Cours;
import com.example.platform.cours.entities.Professeur;
import com.example.platform.cours.entities.Avis;
import com.example.platform.cours.repository.CoursRepository;
import com.example.platform.cours.repository.ProfesseurRepository;
import com.example.platform.cours.repository.AvisRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

        private final ProfesseurRepository professeurRepository;
        private final CoursRepository coursRepository;
        private final AvisRepository avisRepository;

        public DataInitializer(ProfesseurRepository professeurRepository, CoursRepository coursRepository,
                        AvisRepository avisRepository) {
                this.professeurRepository = professeurRepository;
                this.coursRepository = coursRepository;
                this.avisRepository = avisRepository;
        }

        @Override
        public void run(String... args) {
                // Don't re-initialize if data exists
                if (coursRepository.count() > 0) {
                        System.out.println("ℹ️ Data already exists, skipping initialization.");
                        return;
                }

                // Create Professors
                Professeur prof1 = new Professeur(null, "Amrani", "Youssef", "youssef.amrani@univ.ma", "Développement Web");
                Professeur prof2 = new Professeur(null, "Bennani", "Fatima", "fatima.bennani@univ.ma",
                                "Intelligence Artificielle");
                Professeur prof3 = new Professeur(null, "El Mansouri", "Karim", "karim.elmansouri@univ.ma",
                                "Cloud & DevOps");

                prof1 = professeurRepository.save(prof1);
                prof2 = professeurRepository.save(prof2);
                prof3 = professeurRepository.save(prof3);

                // Create Courses with categories
                Cours cours1 = coursRepository.save(new Cours(null, "Introduction à Spring Boot",
                                "Apprenez les bases de Spring Boot pour créer des applications Java modernes.",
                                "9SGDpanrc8U", "Développement Web", prof1));

                Cours cours2 = coursRepository.save(new Cours(null, "Angular pour les débutants",
                                "Découvrez comment créer des applications web avec Angular.",
                                "3qBXWUpoPHo", "Développement Web", prof1));

                Cours cours3 = coursRepository.save(new Cours(null, "Machine Learning avec Python",
                                "Introduction aux concepts de base du Machine Learning et de l'IA.",
                                "7eh4d6sabA0", "Intelligence Artificielle", prof2));

                Cours cours4 = coursRepository.save(new Cours(null, "Docker et Kubernetes",
                                "Déployez vos applications avec les conteneurs Docker et Kubernetes.",
                                "fqMOX6JJhGo", "Cloud & DevOps", prof3));

                Cours cours5 = coursRepository.save(new Cours(null, "React.js Complet",
                                "Créez des interfaces utilisateur modernes avec React.js.",
                                "w7ejDZ8SWv8", "Développement Web", prof1));

                Cours cours6 = coursRepository.save(new Cours(null, "Deep Learning Avancé",
                                "Plongez dans les réseaux de neurones profonds et leurs applications.",
                                "aircAruvnKk", "Intelligence Artificielle", prof2));

                // Create sample reviews
                avisRepository.save(new Avis(null, cours1.getId(), 1L, "Alice Dupont", 5,
                                "Excellent cours, très bien expliqué!", LocalDate.now().minusDays(10).toString()));
                avisRepository.save(new Avis(null, cours1.getId(), 2L, "Bob Martin", 4,
                                "Très bon contenu, j'ai beaucoup appris.", LocalDate.now().minusDays(5).toString()));
                avisRepository.save(new Avis(null, cours3.getId(), 1L, "Alice Dupont", 5,
                                "Le meilleur cours de ML que j'ai vu!", LocalDate.now().minusDays(3).toString()));

                System.out.println(
                                "✅ Sample data initialized: 3 professors, 6 courses with categories, and sample reviews!");
        }
}
