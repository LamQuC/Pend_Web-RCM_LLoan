package com.example.userapi.controller;

import com.example.userapi.dto.UserDTO;
import com.example.userapi.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @GetMapping("/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        try {
            UserDTO user = userService.getUserByUsername(username);
            logger.info("User information retrieved for: {}", username);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            logger.error("Failed to retrieve user {}: {}", username, e.getMessage());
            return ResponseEntity.status(404).body("User not found: " + e.getMessage());
        }
    }
}