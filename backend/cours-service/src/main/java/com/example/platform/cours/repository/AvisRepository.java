package com.example.platform.cours.repository;

import com.example.platform.cours.entities.Avis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface AvisRepository extends JpaRepository<Avis, Long> {
    List<Avis> findByIdCours(Long idCours);

    List<Avis> findByIdEtudiant(Long idEtudiant);
}
