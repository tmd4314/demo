package com.react.demo.User;

import com.react.demo.SecurityConfig;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;

import java.util.*;


@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserSecurityService userSecurityService;


    @GetMapping("/signup")
    public String signup(UserCreateForm userCreateForm) {

        return "redirect:/signup";
    }

    @PostMapping("/signup")
    public ResponseEntity<Object> signup(@Valid @RequestBody UserCreateForm userCreateForm, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            System.out.println("Errors: " + bindingResult.getAllErrors());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }

        try {
            userService.create(userCreateForm);
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



//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody Map<String, String> request, HttpServletRequest httpRequest
//    ){
//        System.out.println("POST : login");
//        String userid = request.get("userid");
//        String enteredPassword = request.get("password"); // ? 암호화 안된거아님?
//
//        String storePasswordHash = userService.getUserPassword(userid); //암호화 처리된 비밀번호
//
//        boolean passwordMatches = passwordEncoder.matches(enteredPassword, storePasswordHash);
//        // 첫번째 인자값 = 암호화가 적용되지 않은 클라이언트로 부터 입력받은 패스워드
//        // 두번째 인갑사 = 암호화가 적용된 DB에서 USERID로 조회한 패스워드
//
//        System.out.println("passwordMatches = " + passwordMatches);
//
//        if(passwordMatches) {
//            userService.login(userid, storePasswordHash);
//            // passwordMatches가 true 라는 말이 곧 로그인 성공이라는 의미 -> 성공했다는 의미의 OK HTTP Status 코드와 Success 메시지 리턴
//            return ResponseEntity.ok("Success");
//        } else {
//            // passwordMatches가 false 라면 애초에 비밀번호가 다르니까 실패 -> 실패 했다는 의미의 BAD_REQUEST 상태코드와 Failure 메시지 리턴
//            System.out.println("Login Fail");
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failure");
//        }
//    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        // 사용자 인증을 시도
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.get("userid"), request.get("password"))
        );

        // 인증에 성공한 경우, 사용자 정보를 UserDetails로 가져옴
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // 필요에 따라 추가적인 로직 수행 가능 (예: 토큰 발급, 세션 설정 등)

        return ResponseEntity.ok("로그인 성공: " +authentication.isAuthenticated());
    }

    @GetMapping("/logout")
        public ResponseEntity<String> logout() {
            // 현재 사용자를 인증에서 로그아웃하고, 세션을 무효화합니다.
            SecurityContextHolder.clearContext();
            return ResponseEntity.ok("로그아웃이 성공적으로 처리되었습니다.");
        }
}

