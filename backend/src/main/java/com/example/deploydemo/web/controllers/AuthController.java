package com.example.deploydemo.web.controllers;

import com.example.deploydemo.service.AuthService;
import com.example.deploydemo.service.dto.JwtResponse;
import com.example.deploydemo.service.dto.LoginUserDtoRequest;
import com.example.deploydemo.service.dto.UserRegistrationDtoRequest;
import com.example.deploydemo.service.exception.UserAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("/easyrent-api/v1")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUserDtoRequest loginUserDto) {
        return ResponseEntity.ok(new JwtResponse(authService.authenticateUser(loginUserDto)));
    }

    @PostMapping("/register_owner")
    public ResponseEntity<?> registerOwner(@RequestBody UserRegistrationDtoRequest userDtoRequest) throws UserAlreadyExistsException {
        authService.registerUser(userDtoRequest);
        return ResponseEntity.status(HttpStatusCode.valueOf(200)).build();
    }

    @PostMapping("/register_tenant")
    public ResponseEntity<?> registerTenant(@RequestBody UserRegistrationDtoRequest userDtoRequest) throws UserAlreadyExistsException {
        return ResponseEntity.status(HttpStatusCode.valueOf(200)).body(new HashMap<>() {{
            put("id", authService.registerUser(userDtoRequest));
        }});
    }
}
