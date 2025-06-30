package com.example.deploydemo.web.controllers.owner;

import com.example.deploydemo.service.ApartmentService;
import com.example.deploydemo.service.ContractService;
import com.example.deploydemo.service.RentContractService;
import com.example.deploydemo.service.TenantService;
import com.example.deploydemo.service.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/easyrent-api/v1/apartments")
public class ApartmentController {
    private final ApartmentService apartmentService;
    private final RentContractService rentContractService;
    private final TenantService tenantService;
    private final ContractService contractService;

    @GetMapping
    public ResponseEntity<Page<ApartmentResponseDto>> getAllOwnersApartments(@RequestParam(required = false, defaultValue = "0") int number,
                                                                             @RequestParam(required = false, defaultValue = "10") int size) {
        return ResponseEntity.ok().body(apartmentService.getAllOwnersApartments(number, size));
    }

    @GetMapping("/{id:\\d+}")
    public ResponseEntity<ApartmentResponseDto> getApartmentById(@PathVariable Long id) {
        return ResponseEntity.ok().body(apartmentService.getApartmentById(id));
    }

    @PostMapping()
    public ResponseEntity<?> createApartment(@RequestBody ApartmentRequestDto apartmentRequestDto) {
        return ResponseEntity.created(apartmentService.createApartment(apartmentRequestDto)).build();
    }

    @PutMapping("/{id:\\d+}")
    public ResponseEntity<?> updateApartment(@PathVariable Long id,
                                             @RequestBody ApartmentRequestDto apartmentRequestDto) {
        apartmentService.updateApartment(id, apartmentRequestDto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id:\\d+}")
    public ResponseEntity<?> deleteApartment(@PathVariable Long id) {
        apartmentService.deleteApartment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id:\\d+}/rentcontracts")
    public ResponseEntity<Page<RentContractResponseDto>> getApartmentRentContracts(@PathVariable Long id,
                                                                                   @RequestParam(required = false, defaultValue = "0") int number,
                                                                                   @RequestParam(required = false, defaultValue = "10") int size) {
        return ResponseEntity.ok().body(rentContractService.getRentContractsByApartmentId(id, number, size));
    }

    @GetMapping("/{id:\\d+}/rentcontracts/{contractId:\\d+}")
    public ResponseEntity<RentContractResponseDto> getApartmentRentContractById(@PathVariable Long id,
                                                                                @PathVariable Long contractId) {
        return ResponseEntity.ok().body(rentContractService.getRentContractByApartmentId(id, contractId));
    }

    @PostMapping("/{id:\\d+}/rentcontracts")
    public ResponseEntity<?> createRentContractInApartment(@PathVariable Long id,
                                                           @RequestBody RentContractCreateRequestDto rentContractCreateRequestDto) {
        return ResponseEntity.created(rentContractService.createRentContract(id, rentContractCreateRequestDto)).build();
    }

    @PutMapping("/{id:\\d+}/rentcontracts/{contractId:\\d+}")
    public ResponseEntity<?> updateRentContractInApartment(@PathVariable Long id,
                                                           @PathVariable Long contractId,
                                                           @RequestBody RentContractUpdateRequestDto rentContractUpdateRequestDto) {
        rentContractService.updateRentContract(id, contractId, rentContractUpdateRequestDto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id:\\d+}/rentcontracts/{contractId:\\d+}")
    public ResponseEntity<?> deleteApartmentRentContractById(@PathVariable Long id,
                                                             @PathVariable Long contractId) {
        rentContractService.deleteRentContractByApartmentId(id, contractId);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/{id:\\d+}/rentcontracts/{contractId:\\d+}/tenants")
    public ResponseEntity<Page<TenantResponseDto>> getApartmentRentContractTenantsById(@PathVariable Long id,
                                                                                       @PathVariable Long contractId,
                                                                                       @RequestParam(required = false, defaultValue = "0") int number,
                                                                                       @RequestParam(required = false, defaultValue = "10") int size) {
        return ResponseEntity.ok().body(tenantService.getRentContractTenantsByApartmentId(id, contractId, number, size));
    }

    @GetMapping("/{id:\\d+}/rentcontracts/{contractId:\\d+}/tenants/{tenantId:\\d+}")
    public ResponseEntity<TenantResponseDto> getApartmentRentContractTenantById(@PathVariable Long id,
                                                                                @PathVariable Long contractId,
                                                                                @PathVariable Long tenantId) {
        return ResponseEntity.ok().body(tenantService.getRentContractTenantByApartmentId(id, contractId, tenantId));
    }

    @PostMapping("/{id:\\d+}/rentcontracts/{contractId:\\d+}/tenants")
    public ResponseEntity<?> createRentContractTenantInApartment(@PathVariable Long id,
                                                                 @PathVariable Long contractId,
                                                                 @RequestBody TenantRequestDto tenantRequestDto) {
        return ResponseEntity.created(tenantService.createRentContractTenant(id, contractId, tenantRequestDto)).build();
    }

    @PutMapping("/{id:\\d+}/rentcontracts/{contractId:\\d+}/tenants/{tenantId:\\d+}")
    public ResponseEntity<?> updateRentContractTenantInApartment(@PathVariable Long id,
                                                                 @PathVariable Long contractId,
                                                                 @PathVariable Long tenantId,
                                                                 @RequestBody TenantRequestDto tenantUpdateRequestDto) {
        tenantService.updateRentContractTenant(id, contractId, tenantId, tenantUpdateRequestDto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id:\\d+}/rentcontracts/{contractId:\\d+}/tenants/{tenantId:\\d+}")
    public ResponseEntity<?> deleteApartmentRentContractTenantById(@PathVariable Long id,
                                                                   @PathVariable Long contractId,
                                                                   @PathVariable Long tenantId) {
        tenantService.deleteRentContractTenantByApartmentId(id, contractId, tenantId);
        return ResponseEntity.noContent().build();
    }


    @GetMapping(value = "/{id:\\d+}/rentcontracts/{contractId:\\d+}/document", produces = MediaType.APPLICATION_PDF_VALUE)
    public @ResponseBody byte[] getApartmentRentContractDocumentById(@PathVariable Long id,
                                                                                  @PathVariable Long contractId) {
        return contractService.getRentContractDocumentByApartmentId(id, contractId);
    }

    @PostMapping("/{id:\\d+}/rentcontracts/{contractId:\\d+}/document")
    public ResponseEntity<?> createRentContractDocumentInApartment(@PathVariable Long id,
                                                                   @PathVariable Long contractId,
                                                                   @RequestParam("document") MultipartFile contractData) {
        return ResponseEntity.created(contractService.createRentContractDocument(id, contractId, contractData)).build();
    }

    @DeleteMapping("/{id:\\d+}/rentcontracts/{contractId:\\d+}/document")
    public ResponseEntity<?> deleteApartmentRentContractDocumentById(@PathVariable Long id,
                                                                     @PathVariable Long contractId) {
        contractService.deleteRentContractDocumentByApartmentId(id, contractId);
        return ResponseEntity.noContent().build();
    }
}
