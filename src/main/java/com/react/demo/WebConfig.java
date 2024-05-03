package com.react.demo;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/{path:[^\\.]*}").setViewName("forward:/");
        registry.addViewController("/user/signup").setViewName("forward:/");
        registry.addViewController("/user/login").setViewName("forward:/");
        registry.addViewController("/user/forecast").setViewName("forward:/");
    }

    @Controller
    public static class SpaController { // SpaController 내부 클래스를 static으로 변경합니다.

        @GetMapping("/error")
        public String handleError() {
            // Handle error gracefully or redirect to a specific error page
            return "index.html";
        }

    }
}
