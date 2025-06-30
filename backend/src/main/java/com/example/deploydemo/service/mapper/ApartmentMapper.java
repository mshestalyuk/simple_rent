package com.example.deploydemo.service.mapper;

import com.example.deploydemo.repository.model.Apartment;
import com.example.deploydemo.service.dto.ApartmentRequestDto;
import com.example.deploydemo.service.dto.ApartmentResponseDto;
import com.example.deploydemo.service.util.UserUtil;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class ApartmentMapper {
    @Autowired
    protected UserUtil userUtil;
    public abstract ApartmentResponseDto apartmentToApartmentDto(Apartment apartment);
    @Mapping(target = "owner", expression = "java( userUtil.getUserFromContext() )")
    public abstract Apartment apartmentFromRequestDto(ApartmentRequestDto apartmentRequestDto);
    public abstract void updateApartmentFromDto(ApartmentRequestDto apartmentRequestDto, @MappingTarget Apartment apartment);
}
