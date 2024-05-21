package com.react.demo.User;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

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

    @Transactional
    public boolean deleteUser(String userid) { // userId -> userid로 수정
        try {
            userRepository.deleteByUserid(userid); // userId -> userid로 수정
            return true; // 예외가 발생하지 않고 삭제가 성공하면 true 반환
        } catch (Exception e) {
            // 삭제에 실패하면 로깅하고 false 반환
            System.err.println("Error deleting user with userId " + userid + ": " + e.getMessage()); // userId -> userid로 수정
            e.printStackTrace();
            return false;
        }
    }

    public void updateUsername(String userid, String username) {
        Optional<User> optionalUser = userRepository.findByUserid(userid);
        User user = optionalUser.orElseThrow(() -> new RuntimeException("User not found."));
        user.setUsername(username);
        userRepository.save(user);
    }

    public void updateEmail(String userid, String email) {
        Optional<User> optionalUser = userRepository.findByUserid(userid);
        User user = optionalUser.orElseThrow(() -> new RuntimeException("User not found."));
        user.setEmail(email);
        userRepository.save(user);
    }

    public void updatePhoneNumber(String userid, String phoneNumber) {
        Optional<User> optionalUser = userRepository.findByUserid(userid);
        User user = optionalUser.orElseThrow(() -> new RuntimeException("User not found."));
        user.setPhoneNumber(phoneNumber);
        userRepository.save(user);
    }

    public void updatePassword(String userid, String password) {
        Optional<User> optionalUser = userRepository.findByUserid(userid);
        User user = optionalUser.orElseThrow(() -> new RuntimeException("User not found."));
        String encodedPassword = passwordEncoder.encode(password);
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }


}
