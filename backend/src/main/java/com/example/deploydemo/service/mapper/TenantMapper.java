package com.example.deploydemo.service.mapper;

import com.example.deploydemo.repository.model.RentContract;
import com.example.deploydemo.repository.model.Tenant;
import com.example.deploydemo.service.dto.TenantRequestDto;
import com.example.deploydemo.service.dto.TenantResponseDto;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class TenantMapper {
    public abstract TenantResponseDto tenantToResponseDto(Tenant tenant);
    public abstract List<TenantResponseDto> tenantListToResponseDtoList(List<Tenant> tenants);
    @Mapping(target = "rentContract", expression = "java( rentContract )")
    public abstract Tenant tenantFromRequestDto(TenantRequestDto createRequestDto, @Context RentContract rentContract);
    public abstract void updateTenantFromRequestDto(TenantRequestDto updateRequestDto, @MappingTarget  Tenant tenant);
}
