package com.example.platform.cours.config;

import com.example.platform.cours.entities.Cours;
import com.example.platform.cours.entities.Professeur;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class RestDataConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        // Expose IDs for all entities
        config.exposeIdsFor(Cours.class, Professeur.class);

        // Configure CORS
        cors.addMapping("/**")
                .allowedOrigins("http://localhost:4400", "http://localhost:4200", "http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
