package com.example.deploydemo.service.exception;

public class RentContractNotFoundException extends EntityNotFoundException{
    public RentContractNotFoundException(String message) {
        super(message);
    }
}
