package com.example.deploydemo.service.exception;

public class TenantNotFoundException extends EntityNotFoundException{
    public TenantNotFoundException(String message) {
        super(message);
    }
}
