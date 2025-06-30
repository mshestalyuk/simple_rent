package com.example.deploydemo.service.dto;

import java.util.Date;

public record RentContractUpdateRequestDto(
        Date conclusionDate,
        Date expiresDate,
        Double montPayment,
        String note
){
}
