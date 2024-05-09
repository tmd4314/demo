package com.react.demo.User;

import com.react.demo.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

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

    public User getUser(String userid) {
        Optional<User> user = this.userRepository.findByUserid(userid);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new DataNotFoundException("고객정보가 없다.");
        }
    }
}
