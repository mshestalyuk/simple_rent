package com.example.deploydemo.service.dto;

public record TenantRequestDto(
        String name,
        String surname,
        String email,
        String phoneNumber
){
}
