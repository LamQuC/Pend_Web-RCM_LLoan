package com.example.userapi.controller;

import com.example.userapi.dto.LoginRequest;
import com.example.userapi.dto.RegisterRequest;
import com.example.userapi.dto.UserDTO;
import com.example.userapi.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        String response = userService.register(registerRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        String jwt = userService.login(loginRequest);
        Map<String, String> response = new HashMap<>();
        response.put("token", jwt);
        response.put("username", loginRequest.getUsername());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user")
    public ResponseEntity<UserDTO> getUser(@RequestParam String username, Authentication authentication) {
        if (!authentication.getName().equals(username)) {
            throw new RuntimeException("You are not authorized to view this user's information");
        }
        UserDTO userDTO = userService.getUserByUsername(username);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id, Authentication authentication) {
        UserDTO userDTO = userService.getUserById(id);
        if (!userService.getUserByUsername(authentication.getName()).getId().equals(id)) {
            throw new RuntimeException("You are not authorized to view this user's information");
        }
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/auth/check")
    public ResponseEntity<?> checkAuthentication() {
        return ResponseEntity.ok("You are authenticated!");
    }
}