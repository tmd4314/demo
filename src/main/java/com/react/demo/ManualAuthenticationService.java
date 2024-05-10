package com.react.demo;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class ManualAuthenticationService {

    private final AuthenticationManager authenticationManager;

    public ManualAuthenticationService(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public void authenticateUser(String username, String password) {
        System.out.println("ManualAuthenticationService  = " + "EnterManualAuthenticationService");
        // 사용자 인증을 위해 UsernamePasswordAuthenticationToken 생성
        Authentication authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        // AuthenticationManager를 통해 사용자를 인증하고 인증된 사용자 정보를 가져옴

        // SecurityContextHolder를 사용하여 SecurityContext에 인증된 사용자 정보를 설정
        try {
            Authentication authentication = authenticationManager.authenticate(authenticationToken); // 에러발생
            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("sibal");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e);
        }

        System.out.println("authenticateUser!!!");
    }
}