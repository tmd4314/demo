package com.react.demo.User;

import lombok.Getter;

@Getter
public enum UserRole {
    //관리자
    USER("ROLE_USER"),
    ADMIN("ROLE_ADMIN");

    UserRole(String value) {
        this.value = value;
    }

    private String value;
}
