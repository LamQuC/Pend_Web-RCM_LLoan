package com.example.userapi.service;

import com.example.userapi.dto.UserDTO;
import com.example.userapi.model.User;
import com.example.userapi.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;

@Service
public class UserService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    logger.error("User not found with username: {}", username);
                    return new UsernameNotFoundException("User not found with username: " + username);
                });
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                new ArrayList<>()
        );
    }

    public UserDTO getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    logger.error("User not found with username: {}", username);
                    return new RuntimeException("User not found with username: " + username);
                });
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getRoles(),
                user.getCreatedAt(),
                user.getLastLogin(),
                user.getAge(),
                user.getSex(),
                user.getIncome(),
                user.getSegment(),
                user.getAgeGrouped(),
                user.getIncomeGrouped()
        );
    }

    public String login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    logger.error("User not found with username: {}", username);
                    return new RuntimeException("User not found");
                });
        if (!passwordEncoder.matches(password, user.getPassword())) {
            logger.error("Invalid password for user: {}", username);
            throw new RuntimeException("Invalid password");
        }
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        return "Login successful";
    }

    public String register(com.example.userapi.dto.RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            logger.error("Username already exists: {}", registerRequest.getUsername());
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            logger.error("Email already exists: {}", registerRequest.getEmail());
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setAge(registerRequest.getAge());
        user.setSex(registerRequest.getSex());
        user.setIncome(registerRequest.getIncome());
        user.setSegment(registerRequest.getSegment());
        user.setAgeGrouped(registerRequest.getAgeGrouped());
        user.setIncomeGrouped(registerRequest.getIncomeGrouped());
        user.setCreatedAt(LocalDateTime.now());
        user.setRoles(Collections.singletonList("ROLE_USER"));

        userRepository.save(user);
        logger.info("User registered successfully: {}", registerRequest.getUsername());
        return "User registered successfully";
    }
}