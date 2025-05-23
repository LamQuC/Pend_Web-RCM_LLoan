package com.example.userapi.controller;

import com.example.userapi.dto.UserDTO;
import com.example.userapi.model.Product;
import com.example.userapi.service.RecommendationService;
import com.example.userapi.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/recommend")
public class RecommendationController {

    private static final Logger logger = LoggerFactory.getLogger(RecommendationController.class);

    @Autowired
    private RecommendationService recommendationService;

    @Autowired
    private UserService userService;

    @GetMapping("/{username}")
    public ResponseEntity<List<Product>> getRecommendations(@PathVariable String username) {
        try {
            UserDTO user = userService.getUserByUsername(username);
            List<Product> recommendations = recommendationService.getRecommendations(username);
            logger.info("Recommendations retrieved for user: {} - count: {}", username, recommendations.size());
            return ResponseEntity.ok(recommendations);
        } catch (Exception e) {
            logger.error("Failed to retrieve recommendations for user {}: {}", username, e.getMessage());
            return ResponseEntity.ok(new ArrayList<>()); // Return empty list instead of error
        }
    }
}