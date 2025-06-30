package com.example.deploydemo.service.dto;

import java.util.Date;

public record RentContractCreateRequestDto(
        Long residentUserId,
        Date conclusionDate,
        Date expiresDate,
        Double montPayment,
        String note
){
}
