package com.example.userapi.service;

import com.example.userapi.model.Product;
import com.example.userapi.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getProductsByUserId(Long userId) {
        return productRepository.findByCustomerId(userId);
    }

    public List<Product> getProductsByCodes(List<String> productCodes) {
        return productRepository.findByProductCodes(productCodes);
    }
}