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
        registry.addViewController("/user/signups").setViewName("forward:/");
        registry.addViewController("/user/logins").setViewName("forward:/");
        registry.addViewController("/user/weather").setViewName("forward:/");
        registry.addViewController("/user/ar").setViewName("forward:/");
        registry.addViewController("/user/as").setViewName("forward:/");
        registry.addViewController("/user/dn").setViewName("forward:/");
        registry.addViewController("/user/gs").setViewName("forward:/");
        registry.addViewController("/user/sg").setViewName("forward:/");
        registry.addViewController("/user/sp").setViewName("forward:/");
        registry.addViewController("/user/ys").setViewName("forward:/");
        registry.addViewController("/user/missions").setViewName("forward:/");
        registry.addViewController("/user/rank").setViewName("forward:/");
        registry.addViewController("/user/missions/1").setViewName("forward:/");
        registry.addViewController("/user/missions/2").setViewName("forward:/");
        registry.addViewController("/user/missions/3").setViewName("forward:/");
        registry.addViewController("/user/missions/4").setViewName("forward:/");
        registry.addViewController("/user/missions/5").setViewName("forward:/");
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
