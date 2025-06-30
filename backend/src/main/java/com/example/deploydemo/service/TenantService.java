package com.example.deploydemo.service;

import com.example.deploydemo.repository.daos.ApartmentRepository;
import com.example.deploydemo.repository.daos.RentContractRepository;
import com.example.deploydemo.repository.daos.TenantRepository;
import com.example.deploydemo.repository.model.Apartment;
import com.example.deploydemo.repository.model.RentContract;
import com.example.deploydemo.repository.model.Tenant;
import com.example.deploydemo.service.dto.TenantRequestDto;
import com.example.deploydemo.service.dto.TenantResponseDto;
import com.example.deploydemo.service.exception.ApartmentNotFoundException;
import com.example.deploydemo.service.exception.RentContractNotFoundException;
import com.example.deploydemo.service.exception.TenantNotFoundException;
import com.example.deploydemo.service.mapper.TenantMapper;
import com.example.deploydemo.service.util.UserUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TenantService {
    private final UserUtil userUtil;
    private final ApartmentRepository apartmentRepository;
    private final TenantMapper tenantMapper;
    private final TenantRepository tenantRepository;
    private final RentContractRepository rentContractRepository;

    public Page<TenantResponseDto> getRentContractTenantsByApartmentId(Long id, Long contractId, int number, int size) {
        Long userId = userUtil.getUserIdFromContext();
        Optional<Apartment> apartment = apartmentRepository.findByIdAndOwner_id(id, userId);
        if (apartment.isPresent()) {
            List<Tenant> tenantList = apartment.get().getRentContracts().stream()
                    .filter(contract -> contract.getId().equals(contractId))
                    .findFirst()
                    .orElseThrow(
                            () -> new RentContractNotFoundException(
                                    String.format("Rent Contract with id = %s not found or not belong to apartment with id = %s", contractId, id)
                            )
                    ).getTenants();

            return new PageImpl<>(tenantList, PageRequest.of(number, size), tenantList.size())
                    .map(tenantMapper::tenantToResponseDto);
        } else throw new ApartmentNotFoundException(
                String.format("Apartment with id = %s not found or not belong to user with id = %s", id, userId)
        );
    }

    public TenantResponseDto getRentContractTenantByApartmentId(Long id, Long contractId, Long tenantId) {
        Long userId = userUtil.getUserIdFromContext();
        Optional<Apartment> apartment = apartmentRepository.findByIdAndOwner_id(id, userId);
        if (apartment.isPresent()) {
            return tenantMapper.tenantToResponseDto(
                    apartment.get().getRentContracts().stream()
                            .filter(contract -> contract.getId().equals(contractId))
                            .findFirst()
                            .orElseThrow(
                                    () -> new RentContractNotFoundException(
                                            String.format("Rent Contract with id = %s not found or not belong to apartment with id = %s", contractId, id)
                                    )
                            ).getTenants().stream()
                            .filter(tenant -> tenant.getId().equals(tenantId))
                            .findFirst()
                            .orElseThrow(
                                    () -> new RentContractNotFoundException(
                                            String.format("Tenant with id = %s not found or not belong to Rent contract with id = %s", tenantId, contractId)
                                    )
                            )
            );
        } else throw new ApartmentNotFoundException(
                String.format("Apartment with id = %s not found or not belong to user with id = %s", id, userId)
        );
    }

    public URI createRentContractTenant(Long id, Long contractId, TenantRequestDto tenantRequestDto) {
        Long userId = userUtil.getUserIdFromContext();
        Optional<Apartment> apartment = apartmentRepository.findByIdAndOwner_id(id, userId);
        if (apartment.isPresent()) {

            RentContract rentContract = apartment.get().getRentContracts().stream()
                    .filter(contract -> contract.getId().equals(contractId))
                    .findFirst()
                    .orElseThrow(
                            () -> new RentContractNotFoundException(
                                    String.format("Rent Contract with id = %s not found or not belong to apartment with id = %s", contractId, id)
                            )
                    );

            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path(String.format("/easyrent-api/v1/apartments/%s/rentcontracts/%s/", id, contractId))
                    .path(tenantRepository.save(tenantMapper.tenantFromRequestDto(tenantRequestDto, rentContract))
                            .getId().toString())
                    .build().toUri();
        } else throw new ApartmentNotFoundException(
                String.format("Apartment with id = %s not found or not belong to user with id = %s", id, userId)
        );
    }

    public void updateRentContractTenant(Long id, Long contractId, Long tenantId, TenantRequestDto tenantUpdateRequestDto) {
        Long userId = userUtil.getUserIdFromContext();
        Optional<Apartment> apartment = apartmentRepository.findByIdAndOwner_id(id, userId);
        if (apartment.isPresent()) {

            RentContract rentContract = apartment.get().getRentContracts().stream()
                    .filter(contract -> contract.getId().equals(contractId))
                    .findFirst()
                    .orElseThrow(
                            () -> new RentContractNotFoundException(
                                    String.format("Rent Contract with id = %s not found or not belong to apartment with id = %s", contractId, id)
                            )
                    );

            Tenant tenantToUpdate = rentContract.getTenants().stream()
                    .filter(tenant -> tenant.getId().equals(tenantId))
                    .findFirst()
                    .orElseThrow(
                            () -> new TenantNotFoundException(
                                    String.format("Tenant with id = %s not found or not belong to Rent contract with id = %s", tenantId, contractId)
                            )
                    );
            tenantMapper.updateTenantFromRequestDto(tenantUpdateRequestDto, tenantToUpdate);
            tenantRepository.save(tenantToUpdate);
        } else throw new ApartmentNotFoundException(
                String.format("Apartment with id = %s not found or not belong to user with id = %s", id, userId)
        );
    }

    @Transactional
    public void deleteRentContractTenantByApartmentId(Long id, Long contractId, Long tenantId) {
        Long userId = userUtil.getUserIdFromContext();
        Optional<Apartment> apartment = apartmentRepository.findByIdAndOwner_id(id, userId);
        if (apartment.isPresent()) {

            RentContract rentContract = apartment.get().getRentContracts().stream()
                    .filter(contract -> contract.getId().equals(contractId))
                    .findFirst()
                    .orElseThrow(
                            () -> new RentContractNotFoundException(
                                    String.format("Rent Contract with id = %s not found or not belong to apartment with id = %s", contractId, id)
                            )
                    );

            rentContract.getTenants().stream()
                    .filter(tenant -> tenant.getId().equals(tenantId))
                    .findFirst().ifPresent(tenantRepository::delete);
        } else throw new ApartmentNotFoundException(
                String.format("Apartment with id = %s not found or not belong to user with id = %s", id, userId)
        );
    }

    public List<TenantResponseDto> getTenantsTenant() {
        Long userId = userUtil.getUserIdFromContext();
        Optional<RentContract> rentContract = rentContractRepository.findByResidentUser_Id(userId);
        if (rentContract.isPresent()) {
            return tenantMapper.tenantListToResponseDtoList(rentContract.get().getTenants());
        } else throw new RentContractNotFoundException(
                String.format("Tenants not found or not belong to user with id = %s", userId)
        );
    }
}
