package com.example.platform.inscription.config;

import com.example.platform.inscription.entities.Etudiant;
import com.example.platform.inscription.entities.Inscription;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class RestDataConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        // Expose IDs for all entities
        config.exposeIdsFor(Etudiant.class, Inscription.class);

        // Configure CORS
        cors.addMapping("/**")
                .allowedOrigins("http://localhost:4400", "http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
