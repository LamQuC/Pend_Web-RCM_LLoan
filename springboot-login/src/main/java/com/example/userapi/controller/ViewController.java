package com.example.userapi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/")
    public String home() {
        return "user-info";
    }

    @GetMapping("/user-info")
    public String userInfo() {
        return "user-info";
    }
}