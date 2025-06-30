package com.example.deploydemo.service;

import com.example.deploydemo.repository.daos.ApartmentRepository;
import com.example.deploydemo.repository.daos.RentContractRepository;
import com.example.deploydemo.repository.model.Apartment;
import com.example.deploydemo.repository.model.RentContract;
import com.example.deploydemo.service.dto.RentContractCreateRequestDto;
import com.example.deploydemo.service.dto.RentContractResponseDto;
import com.example.deploydemo.service.dto.RentContractUpdateRequestDto;
import com.example.deploydemo.service.exception.ApartmentNotFoundException;
import com.example.deploydemo.service.exception.RentContractNotFoundException;
import com.example.deploydemo.service.mapper.RentContractMapper;
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
public class RentContractService {
    private final ApartmentRepository apartmentRepository;
    private final UserUtil userUtil;
    private final RentContractRepository rentContractRepository;
    private final RentContractMapper rentContractMapper;

    public Page<RentContractResponseDto> getRentContractsByApartmentId(Long id, int number, int size) {
        Long userId = userUtil.getUserIdFromContext();
        Optional<Apartment> apartment = apartmentRepository.findByIdAndOwner_id(id, userId);
        if (apartment.isPresent()) {
            List<RentContract> rentContracts = apartment.get().getRentContracts();

            return new PageImpl<>(rentContracts, PageRequest.of(number, size), rentContracts.size())
                    .map(rentContractMapper::rentContractToResponseDto);
        } else throw new ApartmentNotFoundException(
                String.format("Apartment with id = %s not found or not belong to user with id = %s", id, userId)
        );
    }

    public RentContractResponseDto getRentContractByApartmentId(Long id, Long contractId) {
        Long userId = userUtil.getUserIdFromContext();
        Optional<Apartment> apartment = apartmentRepository.findByIdAndOwner_id(id, userId);
        if (apartment.isPresent()) {
            return rentContractMapper.rentContractToResponseDto(
                    apartment.get().getRentContracts().stream()
                            .filter(contract -> contract.getId().equals(contractId))
                            .findFirst()
                            .orElseThrow(
                                    () -> new RentContractNotFoundException(
                                            String.format("Rent Contract with id = %s not found or not belong to apartment with id = %s", contractId, id)
                                    )
                            ));
        } else throw new ApartmentNotFoundException(
                String.format("Apartment with id = %s not found or not belong to user with id = %s", id, userId)
        );
    }

    public URI createRentContract(Long id, RentContractCreateRequestDto rentContractCreateRequestDto) {
        Long userId = userUtil.getUserIdFromContext();
        Optional<Apartment> apartment = apartmentRepository.findByIdAndOwner_id(id, userId);
        if (apartment.isPresent()) {
            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path(String.format("/easyrent-api/v1/apartments/%s/rentcontracts/", id))
                    .path(rentContractRepository.save(rentContractMapper.rentContractFromRequestDto(rentContractCreateRequestDto, apartment.get())).getId().toString())
                    .build().toUri();
        } else throw new ApartmentNotFoundException(
                String.format("Apartment with id = %s not found or not belong to user with id = %s", id, userId)
        );
    }

    public void updateRentContract(Long id, Long contractId, RentContractUpdateRequestDto rentContractUpdateRequestDto) {
        Long userId = userUtil.getUserIdFromContext();
        Optional<Apartment> apartment = apartmentRepository.findByIdAndOwner_id(id, userId);
        if (apartment.isPresent()) {
            RentContract contractToUpdate = apartment.get().getRentContracts().stream().filter(contract -> contract.getId().equals(contractId)).findFirst().orElseThrow(
                    () -> new RentContractNotFoundException(
                            String.format("Rent Contract with id = %s not found or not belong to apartment with id = %s", contractId, id)
                    )
            );
            rentContractMapper.updateRentContractFromDto(rentContractUpdateRequestDto, contractToUpdate);
        } else throw new ApartmentNotFoundException(
                String.format("Apartment with id = %s not found or not belong to user with id = %s", id, userId)
        );
    }

    @Transactional
    public void deleteRentContractByApartmentId(Long id, Long contractId) {
        Long userId = userUtil.getUserIdFromContext();
        Optional<Apartment> apartment = apartmentRepository.findByIdAndOwner_id(id, userId);
        if (apartment.isPresent()) {
            Optional<RentContract> rentContract = apartment.get().getRentContracts().stream().filter(contract -> contract.getId().equals(contractId)).findFirst();

            rentContract.ifPresent(rentContractRepository::delete);
        } else throw new ApartmentNotFoundException(
                String.format("Apartment with id = %s not found or not belong to user with id = %s", id, userId)
        );
    }

    public RentContractResponseDto getTenantsRentContract() {
        Long userId = userUtil.getUserIdFromContext();
        Optional<RentContract> rentContract = rentContractRepository.findByResidentUser_Id(userId);
        if (rentContract.isPresent()) {
            return rentContractMapper.rentContractToResponseDto(rentContract.get());
        } else throw new RentContractNotFoundException(
                String.format("Rent Contract not found or not belong to user with id = %s", userId)
        );
    }
}
