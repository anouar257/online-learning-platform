package com.example.platform.cours.repository;

import com.example.platform.cours.entities.Professeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ProfesseurRepository extends JpaRepository<Professeur, Long> {
}
