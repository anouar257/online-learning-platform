package com.example.platform.cours;

import com.example.platform.cours.entities.Cours;
import com.example.platform.cours.repository.CoursRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CoursServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CoursServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(CoursRepository coursRepository) {
        return args -> {
            coursRepository.save(new Cours(null, "Intro Java", "Les bases", "eIrMbAQWecM"));
            coursRepository.save(new Cours(null, "Spring Boot", "Microservices", "GgbN47Gz1XQ"));
            coursRepository.findAll().forEach(c -> System.out.println(c.getTitre()));
        };
    }
}
