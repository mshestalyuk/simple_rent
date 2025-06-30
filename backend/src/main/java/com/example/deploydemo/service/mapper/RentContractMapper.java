package com.example.deploydemo.service.mapper;

import com.example.deploydemo.repository.model.Apartment;
import com.example.deploydemo.repository.model.RentContract;
import com.example.deploydemo.service.dto.RentContractCreateRequestDto;
import com.example.deploydemo.service.dto.RentContractResponseDto;
import com.example.deploydemo.service.dto.RentContractUpdateRequestDto;
import com.example.deploydemo.service.util.UserUtil;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class RentContractMapper {
    @Autowired
    protected UserUtil userUtil;

    @Mapping(target = "documentLink", expression = """
            java( org.springframework.web.servlet.support.ServletUriComponentsBuilder.fromCurrentContextPath()
                            .path(String.format("/easyrent-api/v1/apartments/%s/rentcontracts/%s/document", rentContract.getApartment().getId(), rentContract.getId()))
                            .build().toUriString(); )""")
    public abstract RentContractResponseDto rentContractToResponseDto(RentContract rentContract);


    @Mappings({
            @Mapping(target = "apartment", expression = "java(apartment)"),
            @Mapping(target = "residentUser", expression = "java(userUtil.getUserById(rentContractDto.residentUserId()))"),
    })
    public abstract RentContract rentContractFromRequestDto(RentContractCreateRequestDto rentContractDto,
                                                            @Context Apartment apartment);

    public abstract void updateRentContractFromDto(RentContractUpdateRequestDto rentContractDto, @MappingTarget RentContract rentContract);
}
