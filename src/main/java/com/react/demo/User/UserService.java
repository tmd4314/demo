package com.react.demo.User;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void create(UserCreateForm userCreateForm) {

        if (existsByEmail(userCreateForm.getEmail())) {
            throw new DataIntegrityViolationException("이미 등록된 이메일 주소입니다.");
        }

        if (existsByUsername(userCreateForm.getUsername())) {
            throw new DataIntegrityViolationException("이미 등록된 닉네임 입니다.");
        }

        User user = new User();
        user.setUserid(userCreateForm.getUserid());
        user.setPassword(passwordEncoder.encode(userCreateForm.getPassword()));
        user.setUsername(userCreateForm.getUsername());
        user.setPhoneNumber(userCreateForm.getPhoneNumber());
        user.setEmail(userCreateForm.getEmail());
        user.setCreated_dt(LocalDateTime.now()); // 생성 일시 설정함.
        userRepository.save(user);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

}
