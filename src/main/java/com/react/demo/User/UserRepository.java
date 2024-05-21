package com.react.demo.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User>findByUserid(String userid);

    //이메일 중복체크
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);

    void deleteByUserid(String userid);

}
