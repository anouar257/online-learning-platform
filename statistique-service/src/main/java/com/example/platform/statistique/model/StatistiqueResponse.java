package com.example.platform.statistique.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatistiqueResponse {
    private String videoId;
    private Long views;  // Type Long pour gérer les milliards de vues YouTube
    private Long likes;
    private String description;
}