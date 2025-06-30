package com.example.deploydemo.service.dto;

public record UserRegistrationDtoRequest(String name,
                                         String surname,
                                         String email,
                                         String password,
                                         RequestedRole role,
                                         String contact_email,
                                         String phone_number) {
}
