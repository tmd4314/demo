package com.react.demo.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomepageController {

    @GetMapping("/api/homepage")
    public String test() {
        return "나중에 불러올데이터입니다.";
    }
}