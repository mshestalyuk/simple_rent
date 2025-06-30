package com.example.deploydemo.service.exception;

public class DocumentNotFoundException extends EntityNotFoundException{
    public DocumentNotFoundException(String message) {
        super(message);
    }
}
