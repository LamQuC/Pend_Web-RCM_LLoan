package com.example.userapi.service;

import com.example.userapi.dto.UserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class RecommendationService {

    private static final Logger logger = LoggerFactory.getLogger(RecommendationService.class);
    private final RestTemplate restTemplate;

    @Value("${app.python.api.url}")
    private String pythonApiUrl;

    public RecommendationService() {
        this.restTemplate = new RestTemplate();
    }

    public List<String> getRecommendations(UserDTO user) throws Exception {
        if (user.getAgeGrouped() == null || user.getSex() == null ||
                user.getIncomeGrouped() == null || user.getSegment() == null) {
            logger.warn("Incomplete user data for {}: falling back to cold start", user.getUsername());
            return getColdStartRecommendations();
        }

        try {
            // Chuẩn bị dữ liệu gửi tới Python API
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            String requestBody = String.format(
                    "{\"age_grouped\":\"%s\",\"sex\":\"%s\",\"income_grouped\":\"%s\",\"segment\":\"%s\"}",
                    user.getAgeGrouped(), user.getSex(), user.getIncomeGrouped(), user.getSegment()
            );
            HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

            // Gọi Python API
            String[] recommendations = restTemplate.postForObject(pythonApiUrl + "/recommend", request, String[].class);
            List<String> result = Arrays.asList(recommendations);
            logger.info("Recommendations for user {}: {}", user.getUsername(), result);
            return result;

        } catch (Exception e) {
            logger.error("Error calling Python API: {}", e.getMessage());
            return getColdStartRecommendations();
        }
    }

    private List<String> getColdStartRecommendations() {
        return Arrays.asList("Current Account", "Direct Debit", "Particular Account");
    }
}