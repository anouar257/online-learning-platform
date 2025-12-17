package com.example.platform.inscription.repository;

import com.example.platform.inscription.entities.Inscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import java.util.List;

@RepositoryRestResource
public interface InscriptionRepository extends JpaRepository<Inscription, Long> {
    List<Inscription> findByIdEtudiant(@Param("idEtudiant") Long idEtudiant);
}
