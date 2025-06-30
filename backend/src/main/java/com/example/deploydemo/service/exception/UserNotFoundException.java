package com.example.deploydemo.service.exception;

public class UserNotFoundException extends EntityNotFoundException{
    public UserNotFoundException(String message) {
        super(message);
    }
}
