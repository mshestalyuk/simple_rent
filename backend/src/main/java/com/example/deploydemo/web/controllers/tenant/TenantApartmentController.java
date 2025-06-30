package com.example.deploydemo.web.controllers.tenant;

import com.example.deploydemo.service.ApartmentService;
import com.example.deploydemo.service.ContractService;
import com.example.deploydemo.service.RentContractService;
import com.example.deploydemo.service.TenantService;
import com.example.deploydemo.service.dto.ApartmentResponseDto;
import com.example.deploydemo.service.dto.RentContractResponseDto;
import com.example.deploydemo.service.dto.TenantResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/easyrent-api/v1/tenant/apartments")
public class TenantApartmentController {

    private final ApartmentService apartmentService;
    private final RentContractService rentContractService;
    private final TenantService tenantService;
    private final ContractService contractService;
    @GetMapping()
    public ResponseEntity<ApartmentResponseDto> getApartment(){

        return ResponseEntity.ok().body(apartmentService.getTenantsApartment());
    }

    @GetMapping("/rentcontract")
    public ResponseEntity<RentContractResponseDto> getApartmentRentContract() {
        return ResponseEntity.ok().body(rentContractService.getTenantsRentContract());
    }
    @GetMapping("/rentcontract/tenant")
    public ResponseEntity<List<TenantResponseDto>> getApartmentTenant(){
        return ResponseEntity.ok().body(tenantService.getTenantsTenant());
    }
    @GetMapping(value = "/rentcontract/document", produces = MediaType.APPLICATION_PDF_VALUE)
    public @ResponseBody byte[] getApartmentRentContractDocument(){
        return contractService.getTenantsDocument();
    }


}
