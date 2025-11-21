package com.example.platform.inscription.controller;

import com.example.platform.inscription.entities.Inscription;
import com.example.platform.inscription.feign.CoursRestClient;
import com.example.platform.inscription.model.Cours;
import com.example.platform.inscription.repository.InscriptionRepository;
import org.springframework.web.bind.annotation.*;

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
    public Inscription inscrire(@RequestBody Inscription inscription) {
        // Vérifie que le cours existe côté cours-service
        coursRestClient.getCoursById(inscription.getIdCours());

        inscription.setDateInscription(java.time.LocalDate.now().toString());
        return inscriptionRepository.save(inscription);
    }

    @GetMapping("/test-cours/{id}")
    public Cours testCours(@PathVariable("id") Long id) {
        return coursRestClient.getCoursById(id);
    }
}
