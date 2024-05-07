package com.react.demo.User;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/signup")
    public ResponseEntity<Object> signup(UserCreateForm userCreateForm) {

        return ResponseEntity.status(HttpStatus.FOUND).header(HttpHeaders.LOCATION, "/signup").build();
    }

    @PostMapping("/signup")
    public ResponseEntity<Object> signup(@Valid UserCreateForm userCreateForm, BindingResult bindingResult) {
        System.out.println("비밀번호1 = " + userCreateForm.getPassword1());
        System.out.println("비밀번호2 = " + userCreateForm.getPassword2());
        System.out.println("아이디 = " + userCreateForm.getUsername());
        System.out.println("이메일 = " + userCreateForm.getEmail());
        System.out.println("전화번호 = " + userCreateForm.getPhoneNumber());

        if (bindingResult.hasErrors()) {
            System.out.println("POST = " + bindingResult.hasErrors());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }

        if (!userCreateForm.getPassword1().equals(userCreateForm.getPassword2())) {
            System.out.println("POST = " + userCreateForm.getPassword1());
            bindingResult.rejectValue("password2", "passwordInCorrect",
                    "2개의 패스워드가 일치하지 않습니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }
        try {
            userService.create(userCreateForm.getUsername(),
                    userCreateForm.getEmail(), userCreateForm.getPhoneNumber(),userCreateForm.getPassword1());
            return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 성공적으로 완료되었습니다.");
        } catch(DataIntegrityViolationException e) {
            e.printStackTrace();
            bindingResult.reject("signupFailed", "이미 등록된 사용자입니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        } catch(Exception e) {
            e.printStackTrace();
            bindingResult.reject("signupFailed", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }
    }
    @GetMapping("/login")
    public ResponseEntity<Object> login() {
        return ResponseEntity.status(HttpStatus.FOUND).header(HttpHeaders.LOCATION, "/login").build();
    }
}

