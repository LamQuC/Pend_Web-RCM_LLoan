package com.example.userapi.controller;

import com.example.userapi.dto.LoginRequest;
import com.example.userapi.dto.RegisterRequest;
import com.example.userapi.model.User;
import com.example.userapi.repository.UserRepository;
import com.example.userapi.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            String result = userService.login(loginRequest.getUsername(), loginRequest.getPassword());
            User user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            logger.info("User {} logged in successfully", loginRequest.getUsername());

            Map<String, Object> response = new HashMap<>();
            response.put("message", result);
            response.put("username", loginRequest.getUsername());
            response.put("userId", user.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Login failed for user {}: {}", loginRequest.getUsername(), e.getMessage());
            return ResponseEntity.status(401).body("Login failed: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            String result = userService.register(registerRequest);
            logger.info("User {} registered successfully", registerRequest.getUsername());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            logger.error("Registration failed for user {}: {}", registerRequest.getUsername(), e.getMessage());
            return ResponseEntity.status(400).body("Registration failed: " + e.getMessage());
        }
    }
}