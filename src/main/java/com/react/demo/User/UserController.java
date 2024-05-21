package com.react.demo.User;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;

import java.util.*;


@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserSecurityService userSecurityService;


    @GetMapping("/signup")
    public ResponseEntity<String> signup() {
        return ResponseEntity.ok("signup");
    }

    @PostMapping("/signup")
    public ResponseEntity<Object> signup(@Valid @RequestBody UserCreateForm userCreateForm, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            // 클라이언트에서 넘어온 값들 에러 잡아주는 경우.
            System.out.println("Errors: " + bindingResult.getAllErrors());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }

        if (userService.existsByEmail(userCreateForm.getEmail())) {
            // 이미 존재하는 이메일인 경우
            bindingResult.reject("signupFailed", "이미 등록된 이메일 주소입니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 등록된 이메일 주소입니다.");
        }

        if (userService.existsByUsername(userCreateForm.getUsername())) {
            // 이미 존재하는 닉네임 경우
            bindingResult.reject("signupFailed", "이미 등록된 닉네임 입니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 등록된 닉네임 입니다.");
        }


        try {
            userService.create(userCreateForm);
            return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 성공적으로 완료되었습니다.");
        } catch(DataIntegrityViolationException e) {
            e.printStackTrace();
            // 이미 존재하는 아이디일 경우
            bindingResult.reject("signupFailed", "이미 등록된 아이디입니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 등록된 아이디입니다.");
        } catch(Exception e) {
            e.printStackTrace();
            bindingResult.reject("signupFailed", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }
    }


    @GetMapping("/login")
    public ResponseEntity<String> login() {
        return ResponseEntity.status(HttpStatus.FOUND).header(HttpHeaders.LOCATION, "/").build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            // 사용자 인증을 시도
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.get("userid"), request.get("password"))
            );

            // 인증에 성공한 경우, 사용자 정보를 UserDetails로 가져옴
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // 필요에 따라 추가적인 로직 수행 가능 (예: 토큰 발급, 세션 설정 등)

            // Optional<User>에서 User를 가져와서 username을 찾음
            Optional<User> userOptional = userRepository.findByUserid(userDetails.getUsername());
            if (userOptional.isPresent()) {
                String userid = userOptional.get().getUserid();
                String username = userOptional.get().getUsername();
                return ResponseEntity.ok(Map.of("userid", userid, "username", username));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("사용자 정보를 찾을 수 없습니다.");
            }
        } catch (BadCredentialsException e) {
            // 비밀번호가 틀린 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.status(HttpStatus.FOUND).header(HttpHeaders.LOCATION, "/").build();
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteUser(@RequestBody UserDeleteRequest request) {
        try {
            boolean deleted = userService.deleteUser(request.getUserid()); // userId -> userid로 수정
            if (deleted) {
                // 사용자 삭제 후에 로깅을 추가하여 어떤 사용자가 삭제되었는지 확인할 수 있도록 합니다.
                System.out.println("User with userId " + request.getUserid() + " deleted successfully."); // userId -> userid로 수정
                return ResponseEntity.ok("사용자가 성공적으로 삭제되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("사용자 삭제 중 오류가 발생했습니다.");
            }
        } catch (EmptyResultDataAccessException e) {
            // 사용자가 존재하지 않는 경우
            System.err.println("User with userId " + request.getUserid() + " not found."); // userId -> userid로 수정
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자가 존재하지 않습니다.");
        } catch (Exception e) {
            // 삭제 중 다른 예외가 발생한 경우
            System.err.println("Error deleting user with userId " + request.getUserid() + ": " + e.getMessage()); // userId -> userid로 수정
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("사용자 삭제 중 오류가 발생했습니다.");
        }
    }

    @PutMapping("/update/username")
    public ResponseEntity<String> updateUsername(@RequestBody UserUpdateRequest request) {
        userService.updateUsername(request.getUserid(), request.getUsername());
        return ResponseEntity.status(HttpStatus.OK).body("Username updated successfully.");
    }

    @PutMapping("/update/email")
    public ResponseEntity<String> updateEmail(@RequestBody UserUpdateRequest request) {
        userService.updateEmail(request.getUserid(), request.getEmail());
        return ResponseEntity.status(HttpStatus.OK).body("Email updated successfully.");
    }

    @PutMapping("/update/phoneNumber")
    public ResponseEntity<String> updatePhoneNumber(@RequestBody UserUpdateRequest request) {
        userService.updatePhoneNumber(request.getUserid(), request.getPhoneNumber());
        return ResponseEntity.status(HttpStatus.OK).body("Phone number updated successfully.");
    }

    @PutMapping("/update/password")
    public ResponseEntity<String> updatePassword(@RequestBody UserUpdateRequest request) {
        userService.updatePassword(request.getUserid(), request.getPassword());
        return ResponseEntity.status(HttpStatus.OK).body("Password updated successfully.");
    }


}

