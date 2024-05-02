package com.react.demo.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/signup")
    public User signUp(@RequestBody UserCreateForm form) {
        return userService.createUser(form.getUsername(), form.getEmail(), form.getPassword1());
    }

    // 기타 필요한 API 엔드포인트는 추가
}