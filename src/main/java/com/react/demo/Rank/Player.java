package com.react.demo.Rank;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "user")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long no;

    @Column(unique = true)
    private String userid;

    private String password;

    @Column(unique = true)
    private String username;

    private String phoneNumber;

    @Column(unique = true)
    private String email;

}
