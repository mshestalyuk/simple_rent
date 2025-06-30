package com.example.deploydemo.service;

import com.example.deploydemo.repository.daos.RoleRepository;
import com.example.deploydemo.repository.model.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;
    public Role findRoleByName(String name){
        return roleRepository.findByName(name).get();
    }
}
