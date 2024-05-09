package com.react.demo.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCreateForm {

    private String userid;

    private String password;

    private String username;

    private String phoneNumber;

    private String email;

}
