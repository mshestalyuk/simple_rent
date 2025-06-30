package com.example.deploydemo.service.dto;

import lombok.Data;

@Data
public class LoginUserDtoRequest {
    private String username;
    private String password;
}
