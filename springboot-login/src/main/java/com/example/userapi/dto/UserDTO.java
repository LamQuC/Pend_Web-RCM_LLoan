package com.example.userapi.dto;

import java.time.LocalDateTime;
import java.util.List;

public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String password;
    private List<String> roles;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;
    private Integer age;
    private String sex;
    private Long income;
    private String segment;
    private String ageGrouped;
    private String incomeGrouped;

    public UserDTO(Long id, String username, String email, String password, List<String> roles,
                   LocalDateTime createdAt, LocalDateTime lastLogin, Integer age, String sex,
                   Long income, String segment, String ageGrouped, String incomeGrouped) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.createdAt = createdAt;
        this.lastLogin = lastLogin;
        this.age = age;
        this.sex = sex;
        this.income = income;
        this.segment = segment;
        this.ageGrouped = ageGrouped;
        this.incomeGrouped = incomeGrouped;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public List<String> getRoles() { return roles; }
    public void setRoles(List<String> roles) { this.roles = roles; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getLastLogin() { return lastLogin; }
    public void setLastLogin(LocalDateTime lastLogin) { this.lastLogin = lastLogin; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public String getSex() { return sex; }
    public void setSex(String sex) { this.sex = sex; }
    public Long getIncome() { return income; }
    public void setIncome(Long income) { this.income = income; }
    public String getSegment() { return segment; }
    public void setSegment(String segment) { this.segment = segment; }
    public String getAgeGrouped() { return ageGrouped; }
    public void setAgeGrouped(String ageGrouped) { this.ageGrouped = ageGrouped; }
    public String getIncomeGrouped() { return incomeGrouped; }
    public void setIncomeGrouped(String incomeGrouped) { this.incomeGrouped = incomeGrouped; }
}