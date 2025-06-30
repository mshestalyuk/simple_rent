package com.example.deploydemo.service;

import com.example.deploydemo.repository.daos.ApartmentRepository;
import com.example.deploydemo.repository.daos.ContractRepository;
import com.example.deploydemo.repository.daos.RentContractRepository;
import com.example.deploydemo.repository.model.Apartment;
import com.example.deploydemo.repository.model.Contract;
import com.example.deploydemo.repository.model.RentContract;
import com.example.deploydemo.service.exception.ApartmentNotFoundException;
import com.example.deploydemo.service.exception.DocumentNotFoundException;
import com.example.deploydemo.service.exception.RentContractNotFoundException;
import com.example.deploydemo.service.util.UserUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ContractService {
    private final ApartmentRepository apartmentRepository;
    private final ContractRepository contractRepository;
    private final UserUtil userUtil;
    private final RentContractRepository rentContractRepository;


    public byte[] getTeacherPictureByPictureId(String id) {
        return contractRepository.findById(UUID.fromString(id)).orElseThrow(() -> new DocumentNotFoundException(
                String.format("Contract with id = %s not found", id)
        )).getData();
    }

    public URI createContract(String fileName, String fileType, byte[] contractData) {
        Contract contract = new Contract();
        contract.setType(fileType);
        contract.setName(fileName);
        contract.setData(contractData);
        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/easyrent-api/v1/documents/")
                .path(contractRepository.save(contract).getUuid().toString())
                .build().toUri();
    }

    public byte[] getRentContractDocumentByApartmentId(Long id, Long contractId) {
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
            if (rentContract.getDocument() != null) {
                return rentContract.getDocument().getData();
            } else throw new DocumentNotFoundException(
                    String.format("Contract not found or not belong to user with id = %s", userId));

        } else throw new ApartmentNotFoundException(
                String.format("Apartment with id = %s not found or not belong to user with id = %s", id, userId)
        );
    }

    public URI createRentContractDocument(Long id, Long contractId, MultipartFile contractData) {
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
            byte[] data;
            Contract contract;
            try {
                data = contractData.getBytes();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            if (rentContract.getDocument() != null) {
                contract = rentContract.getDocument();
                contract.setData(data);
                contract.setName(contractData.getName());
            } else {
                contract = new Contract();
                contract.setType("pdf");
                contract.setName(contractData.getName());
                contract.setRentContract(rentContract);
                contract.setData(data);
            }
            contractRepository.save(contract);
            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path(String.format("/easyrent-api/v1/apartments/%s/rentcontracts/%s/document", id, contractId))
                    .build().toUri();
        } else throw new ApartmentNotFoundException(
                String.format("Apartment with id = %s not found or not belong to user with id = %s", id, userId)
        );
    }

    @Transactional
    public void deleteRentContractDocumentByApartmentId(Long id, Long contractId) {
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
            if (rentContract.getDocument() != null) {
                contractRepository.delete(rentContract.getDocument());
            }
        } else throw new ApartmentNotFoundException(
                String.format("Apartment with id = %s not found or not belong to user with id = %s", id, userId)
        );
    }

    public byte[] getTenantsDocument() {
        Long userId = userUtil.getUserIdFromContext();
        Optional<RentContract> rentContract = rentContractRepository.findByResidentUser_Id(userId);
        if (rentContract.isPresent()) {
            return rentContract.get().getDocument().getData();
        } else throw new RentContractNotFoundException(
                String.format("Document not found or not belong to user with id = %s", userId)
        );
    }
}
