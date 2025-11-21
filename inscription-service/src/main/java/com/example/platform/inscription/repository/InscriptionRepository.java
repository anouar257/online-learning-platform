package com.example.platform.inscription.repository;

import com.example.platform.inscription.entities.Inscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InscriptionRepository extends JpaRepository<Inscription, Long> {
}
