package com.react.demo.User;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String userid;

    private String password;

    @Column(unique = true)
    private String username;

    private String phoneNumber;

    @Column(unique = true)
    private String email;

    private LocalDateTime created_dt;

}
