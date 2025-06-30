package com.example.deploydemo.repository.daos;

import com.example.deploydemo.repository.model.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TenantRepository extends JpaRepository<Tenant, Long> {
}
