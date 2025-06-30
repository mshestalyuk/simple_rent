package com.example.deploydemo.service.exception;

public class ApartmentNotFoundException extends EntityNotFoundException{
    public ApartmentNotFoundException(String message) {
        super(message);
    }
}
