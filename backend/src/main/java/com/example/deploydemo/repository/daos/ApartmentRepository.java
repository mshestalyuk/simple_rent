package com.example.deploydemo.repository.daos;

import com.example.deploydemo.repository.model.Apartment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApartmentRepository extends JpaRepository<Apartment, Long> {
    Page<Apartment> findAllByOwner_Id(Long userId, Pageable pageable);
    Optional<Apartment> findByIdAndOwner_id(Long id, Long userId);
    void deleteByIdAndOwner_Id(Long id, Long userId);
}
