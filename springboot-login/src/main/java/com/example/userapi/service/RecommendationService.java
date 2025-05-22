package com.example.userapi.service;

import com.example.userapi.model.Product;
import com.example.userapi.dto.UserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

@Service
public class RecommendationService {
    private static final Logger logger = LoggerFactory.getLogger(RecommendationService.class);
    private static final String PYTHON_API_URL = "http://localhost:8000/recommend";

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    public List<Product> getRecommendations(String username) {
        logger.debug("Calling Python API at: {}", PYTHON_API_URL);
        try {
            // Get actual user data
            UserDTO user = userService.getUserByUsername(username);
            logger.info("Getting recommendations for user: {} with age: {}, income: {}, segment: {}", 
                username, user.getAgeGrouped(), user.getIncomeGrouped(), user.getSegment());

            String[] recommendations = restTemplate.postForObject(
                    PYTHON_API_URL,
                    createUserInput(user),
                    String[].class
            );
            
            // Convert product codes to list
            List<String> productCodes = recommendations != null ? Arrays.asList(recommendations) : new ArrayList<>();
            logger.info("Recommendations for user {}: {}", username, productCodes);

            // Fetch products by productCodes using ProductService
            List<Product> recommendedProducts = productService.getProductsByCodes(productCodes);
            logger.info("Found {} products for recommendations", recommendedProducts.size());
            
            // If no products found, return some default products
            if (recommendedProducts.isEmpty()) {
                logger.warn("No products found for recommendations, returning default products");
                return getDefaultProducts();
            }
            
            return recommendedProducts;
        } catch (Exception e) {
            logger.error("Error fetching recommendations for user {}: {}", username, e.getMessage());
            return getDefaultProducts();
        }
    }

    private List<Product> getDefaultProducts() {
        try {
            return productService.getProductsByCodes(Arrays.asList(
                "ind_cco_fin_ult1",  // Current Account
                "ind_recibo_ult1",   // Direct Debit
                "ind_ctop_fin_ult1"  // Particular Account
            ));
        } catch (Exception e) {
            logger.error("Error fetching default products: {}", e.getMessage());
            return new ArrayList<>();
        }
    }

    private UserInput createUserInput(UserDTO user) {
        return new UserInput(
            user.getAgeGrouped(),
            user.getSex(),
            user.getIncomeGrouped(),
            user.getSegment(),
            user.getCreatedAt() != null ? user.getCreatedAt().toString() : null
        );
    }

    private static class UserInput {
        private String age_grouped;
        private String sex;
        private String income_grouped;
        private String segment;
        private String createdAt;

        public UserInput(String age_grouped, String sex, String income_grouped, String segment, String createdAt) {
            this.age_grouped = age_grouped;
            this.sex = sex;
            this.income_grouped = income_grouped;
            this.segment = segment;
            this.createdAt = createdAt;
        }

        // Getters and setters
        public String getAge_grouped() { return age_grouped; }
        public void setAge_grouped(String age_grouped) { this.age_grouped = age_grouped; }
        public String getSex() { return sex; }
        public void setSex(String sex) { this.sex = sex; }
        public String getIncome_grouped() { return income_grouped; }
        public void setIncome_grouped(String income_grouped) { this.income_grouped = income_grouped; }
        public String getSegment() { return segment; }
        public void setSegment(String segment) { this.segment = segment; }
        public String getCreatedAt() { return createdAt; }
        public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
    }
}