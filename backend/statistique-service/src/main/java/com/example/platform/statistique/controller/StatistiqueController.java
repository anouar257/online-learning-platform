package com.example.platform.statistique.controller;

import com.example.platform.statistique.model.StatistiqueResponse;
import com.example.platform.statistique.model.YoutubeApiResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/stats")
public class StatistiqueController {

    private final WebClient webClient;

    @Value("${youtube.api.key}")
    private String apiKey;

    public StatistiqueController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("https://www.googleapis.com")
                .build();
    }

    @GetMapping("/{videoId}")
    public Mono<StatistiqueResponse> getStatistiques(@PathVariable String videoId) {

        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/youtube/v3/videos")
                        .queryParam("part", "statistics")
                        .queryParam("id", videoId)
                        .queryParam("key", apiKey)
                        .build())
                .retrieve()
                .bodyToMono(YoutubeApiResponse.class)
                .map(ytResponse -> {
                    long vues = 0L;
                    long likes = 0L;

                    if (ytResponse.getItems() != null && !ytResponse.getItems().isEmpty()) {
                        var stats = ytResponse.getItems().get(0).getStatistics();
                        if (stats != null) {
                            vues = Long.parseLong(stats.getViewCount());
                            likes = Long.parseLong(stats.getLikeCount());
                        }
                    }

                    return new StatistiqueResponse(videoId, vues, likes, "Données réelles YouTube");
                })
                .onErrorResume(e -> {
                    System.err.println("Erreur YouTube : " + e.getMessage());
                    return Mono.just(new StatistiqueResponse(videoId, 0L, 0L, "Erreur API"));
                });
    }
}