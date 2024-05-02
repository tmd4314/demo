package com.react.demo;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // 프론트엔드의 도메인
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 HTTP 메서드
                .allowedHeaders("*"); // 허용할 헤더
    }
}