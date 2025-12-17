package com.example.platform.inscription.controller;

import com.example.platform.inscription.entities.Inscription;
import com.example.platform.inscription.feign.CoursRestClient;
import com.example.platform.inscription.model.Cours;
import com.example.platform.inscription.repository.InscriptionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/inscriptions")
public class InscriptionController {

    private final InscriptionRepository inscriptionRepository;
    private final CoursRestClient coursRestClient;

    public InscriptionController(InscriptionRepository inscriptionRepository, CoursRestClient coursRestClient) {
        this.inscriptionRepository = inscriptionRepository;
        this.coursRestClient = coursRestClient;
    }

    @PostMapping
    public ResponseEntity<?> inscrire(@RequestBody Inscription inscription) {
        // Vérifier si l'étudiant est déjà inscrit à ce cours
        List<Inscription> existingInscriptions = inscriptionRepository.findByIdEtudiant(inscription.getIdEtudiant());
        boolean alreadyEnrolled = existingInscriptions.stream()
                .anyMatch(i -> i.getIdCours().equals(inscription.getIdCours()));

        if (alreadyEnrolled) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Already enrolled in this course"));
        }

        try {
            // Vérifie que le cours existe côté cours-service
            coursRestClient.getCoursById(inscription.getIdCours());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Course not found"));
        }

        inscription.setDateInscription(LocalDate.now().toString());
        inscription.setProgression(0);
        inscription.setCompleted(false);
        Inscription saved = inscriptionRepository.save(inscription);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/etudiant/{etudiantId}")
    public List<Inscription> getInscriptionsByEtudiant(@PathVariable Long etudiantId) {
        return inscriptionRepository.findByIdEtudiant(etudiantId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelInscription(@PathVariable Long id) {
        if (inscriptionRepository.existsById(id)) {
            inscriptionRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Inscription cancelled"));
        }
        return ResponseEntity.notFound().build();
    }

    // Update progression
    @PutMapping("/{id}/progression")
    public ResponseEntity<?> updateProgression(@PathVariable Long id, @RequestBody Map<String, Integer> body) {
        Optional<Inscription> optInscription = inscriptionRepository.findById(id);
        if (optInscription.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Inscription inscription = optInscription.get();
        Integer progression = body.get("progression");
        if (progression != null) {
            inscription.setProgression(Math.min(100, Math.max(0, progression)));
        }
        inscriptionRepository.save(inscription);
        return ResponseEntity.ok(inscription);
    }

    // Mark course as completed
    @PutMapping("/{id}/complete")
    public ResponseEntity<?> completeCourse(@PathVariable Long id) {
        Optional<Inscription> optInscription = inscriptionRepository.findById(id);
        if (optInscription.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Inscription inscription = optInscription.get();
        inscription.setProgression(100);
        inscription.setCompleted(true);
        inscription.setDateCompletion(LocalDate.now().toString());
        inscriptionRepository.save(inscription);
        return ResponseEntity.ok(inscription);
    }

    @GetMapping("/test-cours/{id}")
    public Cours testCours(@PathVariable("id") Long id) {
        return coursRestClient.getCoursById(id);
    }
}
