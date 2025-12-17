package com.example.platform.inscription;

import com.example.platform.inscription.entities.Etudiant;
import com.example.platform.inscription.repository.EtudiantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final EtudiantRepository etudiantRepository;

    public DataInitializer(EtudiantRepository etudiantRepository) {
        this.etudiantRepository = etudiantRepository;
    }

    @Override
    public void run(String... args) {
        // Check if admin already exists
        if (etudiantRepository.findByEmail("anouarmountade@gmail.com") == null) {
            // Create admin user only
            Etudiant admin = new Etudiant();
            admin.setNom("Mountade");
            admin.setPrenom("Anouar");
            admin.setEmail("anouarmountade@gmail.com");
            admin.setPassword("anouar");
            admin.setRole("ADMIN");
            etudiantRepository.save(admin);
            
            System.out.println("================================================");
            System.out.println("COMPTE ADMIN CRÉÉ:");
            System.out.println("  Email: anouarmountade@gmail.com");
            System.out.println("  Password: anouar");
            System.out.println("  Rôle: ADMIN");
            System.out.println("================================================");
            System.out.println("✅ Les étudiants doivent créer leurs comptes via /signup");
        } else {
            System.out.println("✅ Admin existe déjà. Les étudiants doivent créer leurs comptes via /signup");
        }
    }
}

