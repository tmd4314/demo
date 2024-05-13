package com.react.demo.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User>findByUserid(String userid);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);

}
