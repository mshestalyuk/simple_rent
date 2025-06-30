package com.example.deploydemo.service.dto;

import java.util.Date;

public record RentContractResponseDto(
        Long id,
        Date conclusionDate,
        Date expiresDate,
        Double montPayment,
        String note,
        String documentLink,
        String photoLinks
) {
}
