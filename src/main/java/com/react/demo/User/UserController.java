package com.react.demo.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PreAuthorize("permitAll()")
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserCreateForm form) {
        User user = new User();
        user.setUsername(form.getUsername());
        user.setPassword(passwordEncoder.encode(form.getPassword()));
        user.setPhoneNumber(form.getPhoneNumber());
        user.setEmail(form.getEmail());

        userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
