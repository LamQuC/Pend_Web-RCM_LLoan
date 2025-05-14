package com.example.userapi.dto;

import java.util.List;

public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private Integer age;
    private String sex;
    private Long income;
    private String segment;
    private String ageGrouped; // Optional, computed server-side
    private String incomeGrouped; // Optional, computed server-side
    private List<String> roles;

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
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
    public List<String> getRoles() { return roles; }
    public void setRoles(List<String> roles) { this.roles = roles; }
}