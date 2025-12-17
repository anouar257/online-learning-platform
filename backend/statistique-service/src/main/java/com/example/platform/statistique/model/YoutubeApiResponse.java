package com.example.platform.statistique.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import java.util.List;

// Sert à lire la structure complexe de Google
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class YoutubeApiResponse {
    private List<Item> items;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Item {
        private String id;
        private Statistics statistics;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Statistics {
        private String viewCount;
        private String likeCount;
        private String commentCount;
    }
}