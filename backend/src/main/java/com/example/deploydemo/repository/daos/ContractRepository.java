package com.example.deploydemo.repository.daos;

import com.example.deploydemo.repository.model.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface ContractRepository extends JpaRepository<Contract, UUID> {
}
