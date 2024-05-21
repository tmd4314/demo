package com.react.demo.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequest {
    private String userid;
    private String username;
    private String email;
    private String phoneNumber;
    private String password;
}
