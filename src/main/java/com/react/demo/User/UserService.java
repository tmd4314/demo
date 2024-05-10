package com.react.demo.User;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User create(UserCreateForm userCreateForm) {
        User user = new User();
        user.setUserid(userCreateForm.getUserid());
        user.setPassword(passwordEncoder.encode(userCreateForm.getPassword()));
        user.setUsername(userCreateForm.getUsername());
        user.setPhoneNumber(userCreateForm.getPhoneNumber());
        user.setEmail(userCreateForm.getEmail());
        user.setCreated_dt(LocalDateTime.now()); // 생성 일시 설정
        return userRepository.save(user);
    }

//    public void login(String userid, String hashedPassword) {
//        Authentication authenticationToken = new UsernamePasswordAuthenticationToken(userid, hashedPassword);
//        // AuthenticationManager를 통해 사용자를 인증하고 인증된 사용자 정보를 가져옴
//
//        // SecurityContextHolder를 사용하여 SecurityContext에 인증된 사용자 정보를 설정
//            Authentication authentication = authenticationManager.authenticate(authenticationToken); // 에러발생
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//    }
//
//    public String getUserPassword(String userid) {
//        Optional<User> byUserid = userRepository.findByUserid(userid);
//        return byUserid.get().getPassword();
//    }
}
