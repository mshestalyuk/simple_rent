package com.example.deploydemo.service.dto;

public record TenantResponseDto(
        Long id,
        String name,
        String surname,
        String email,
        String phoneNumber
) {
}
