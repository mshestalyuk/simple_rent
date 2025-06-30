package com.example.deploydemo.repository.daos;

import com.example.deploydemo.repository.model.RentContract;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RentContractRepository extends JpaRepository<RentContract, Long> {
    Page<RentContract> getRentContractsByApartment_Id(Long id, Pageable pageable);
    Optional<RentContract> findByResidentUser_Id(Long id);
}
