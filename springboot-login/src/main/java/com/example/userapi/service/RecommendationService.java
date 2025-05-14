package com.example.userapi.service;

import com.example.userapi.model.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RecommendationService {
    private static final Logger logger = LoggerFactory.getLogger(RecommendationService.class);
    private static final String PYTHON_API_URL = "http://localhost:8000/recommend";

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ProductService productService;

    // Mapping from product_name to product_code based on products table
    private static final Map<String, String> PRODUCT_NAME_TO_CODE = new HashMap<>();
    static {
        PRODUCT_NAME_TO_CODE.put("Savings Account", "ind_ahor_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("Guarantees", "ind_aval_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("Current Account", "ind_cco_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("Derivatives", "ind_cder_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("Payroll Account", "ind_cno_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("Junior Account", "ind_ctju_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("More Account", "ind_ctma_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("Particular Account", "ind_ctop_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("Particular Plus Account", "ind_ctpp_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("Short-term Deposits", "ind_deco_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("Medium-term Deposits", "ind_deme_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("Long-term Deposits", "ind_dela_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("E-account", "ind_ecue_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("Funds", "ind_fond_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("Mortgage", "ind_hip_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("Pension Plan", "ind_plan_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("Loans", "ind_pres_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("Taxes", "ind_reca_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("Credit Card", "ind_tjcr_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("Securities", "ind_valo_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("Home Account", "ind_viv_fin_ult1");
        PRODUCT_NAME_TO_CODE.put("Payroll", "ind_nomina_ult1");
        PRODUCT_NAME_TO_CODE.put("Pensions", "ind_nom_pens_ult1");
        PRODUCT_NAME_TO_CODE.put("Direct Debit", "ind_recibo_ult1");
    }

    public List<Product> getRecommendations(String username) {
        logger.debug("Calling Python API at: {}", PYTHON_API_URL);
        try {
            String[] recommendations = restTemplate.postForObject(
                    PYTHON_API_URL,
                    createUserInput(username),
                    String[].class
            );
            // Convert product names to product codes
            List<String> productCodes = Arrays.stream(recommendations)
                    .map(name -> PRODUCT_NAME_TO_CODE.getOrDefault(name, name))
                    .collect(Collectors.toList());
            logger.info("Recommendations for user {}: {}", username, productCodes);

            // Fetch products by productCodes
            List<Product> recommendedProducts = productService.getProductsByCodes(productCodes);
            logger.info("Found {} products for recommendations", recommendedProducts.size());
            return recommendedProducts;
        } catch (Exception e) {
            logger.error("Error fetching recommendations for user {}: {}", username, e.getMessage());
            throw new RuntimeException("Failed to fetch recommendations", e);
        }
    }

    private UserInput createUserInput(String username) {
        // Simplified for brevity; use actual user data
        return new UserInput("<25", "M", "<50k", "Individuals");
    }

    private static class UserInput {
        private String age_grouped;
        private String sex;
        private String income_grouped;
        private String segment;

        public UserInput(String age_grouped, String sex, String income_grouped, String segment) {
            this.age_grouped = age_grouped;
            this.sex = sex;
            this.income_grouped = income_grouped;
            this.segment = segment;
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
    }
}