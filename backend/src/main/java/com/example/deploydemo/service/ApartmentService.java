package com.example.deploydemo.service;

import com.example.deploydemo.repository.daos.ApartmentRepository;
import com.example.deploydemo.repository.daos.RentContractRepository;
import com.example.deploydemo.repository.model.Apartment;
import com.example.deploydemo.repository.model.RentContract;
import com.example.deploydemo.service.dto.ApartmentRequestDto;
import com.example.deploydemo.service.dto.ApartmentResponseDto;
import com.example.deploydemo.service.exception.ApartmentNotFoundException;
import com.example.deploydemo.service.exception.RentContractNotFoundException;
import com.example.deploydemo.service.mapper.ApartmentMapper;
import com.example.deploydemo.service.util.UserUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ApartmentService {
    private final ApartmentRepository apartmentRepository;
    private final UserUtil userUtil;
    private final ApartmentMapper apartmentMapper;
    private final RentContractRepository rentContractRepository;

    public Page<ApartmentResponseDto> getAllOwnersApartments(int number, int size) {
        return apartmentRepository.findAllByOwner_Id(userUtil.getUserIdFromContext(), PageRequest.of(number, size))
                .map(apartmentMapper::apartmentToApartmentDto);
    }

    public ApartmentResponseDto getApartmentById(Long id) {
        Long userId = userUtil.getUserIdFromContext();
        return apartmentMapper.apartmentToApartmentDto(apartmentRepository.findByIdAndOwner_id(id, userId).orElseThrow(
                () -> new ApartmentNotFoundException(
                        String.format("Apartment with id = %s not found or not belong to user with id = %s", id, userId)
                )
        ));
    }

    public URI createApartment(ApartmentRequestDto apartmentRequestDto) {
        Apartment apartment = apartmentMapper.apartmentFromRequestDto(apartmentRequestDto);
        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/easyrent-api/v1/apartments/")
                .path(apartmentRepository.save(apartment).getId().toString())
                .build().toUri();
    }

    public void updateApartment(Long id, ApartmentRequestDto apartmentRequestDto) {
        Long userId = userUtil.getUserIdFromContext();
        Apartment apartment = apartmentRepository.findByIdAndOwner_id(id, userId).orElseThrow(
                () -> new ApartmentNotFoundException(
                        String.format("Apartment with id = %s not found or not belong to user with id = %s", id, userId)
                )
        );
        apartmentMapper.updateApartmentFromDto(apartmentRequestDto, apartment);
        apartmentRepository.save(apartment);
    }

    @Transactional
    public void deleteApartment(Long id) {
        apartmentRepository.deleteByIdAndOwner_Id(id, userUtil.getUserIdFromContext());
    }

    public ApartmentResponseDto getTenantsApartment() {
        Long userId = userUtil.getUserIdFromContext();
        Optional<RentContract> rentContract = rentContractRepository.findByResidentUser_Id(userId);
        if (rentContract.isPresent()) {
            return apartmentMapper.apartmentToApartmentDto(rentContract.get().getApartment());
        } else throw new RentContractNotFoundException(
                String.format("Rent Contract not found or not belong to user with id = %s", userId)
        );
    }
}
