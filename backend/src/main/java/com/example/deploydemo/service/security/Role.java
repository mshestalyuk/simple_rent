package com.example.deploydemo.service.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static com.example.deploydemo.service.security.Permission.*;

public enum Role {
    ADMIN(Set.of(
            ADMIN_SPECIFIC_PERM,    //TEMPORARY. DELETE AFTER TESTS
               //TEMPORARY
            SEMI_PERM,     //TEMPORARY.


            APARTMENTS_READ,
            APARTMENTS_CREATE,
            APARTMENTS_DELETE,

            RENT_CONTRACT_READ,
            RENT_CONTRACT_CREATE,
            RENT_CONTRACT_DELETE,

            CONTRACT_READ,
            CONTRACT_CREATE,
            CONTRACT_DELETE,

            RENT_PROPERTY_PHOTO_READ,
            RENT_PROPERTY_PHOTO_CREATE,
            RENT_PROPERTY_PHOTO_DELETE,

            TENANT_READ,
            TENANT_CREATE,
            TENANT_DELETE,

            APPEAL_READ,
            APPEAL_CREATE,
            APPEAL_UPDATE,
            APPEAL_DELETE,

            ANNOUNCEMENT_READ,
            ANNOUNCEMENT_CREATE,
            ANNOUNCEMENT_DELETE,

            TENANT_USER_CREATE,
            TENANT_USER_UPDATE,
            OWNER_USER_CREATE,
            OWNER_USER_UPDATE
    )),
    OWNER(Set.of(
            OWNER_SPECIFIC_PERM,
            SEMI_PERM,

            APARTMENTS_READ,
            APARTMENTS_CREATE,
            APARTMENTS_DELETE,

            RENT_CONTRACT_READ,
            RENT_CONTRACT_CREATE,
            RENT_CONTRACT_DELETE,

            CONTRACT_READ,
            CONTRACT_CREATE,
            CONTRACT_DELETE,

            RENT_PROPERTY_PHOTO_READ,
            RENT_PROPERTY_PHOTO_CREATE,
            RENT_PROPERTY_PHOTO_DELETE,

            TENANT_READ,
            TENANT_CREATE,
            TENANT_DELETE,

            APPEAL_CREATE,
            APPEAL_UPDATE,

            ANNOUNCEMENT_READ,
            ANNOUNCEMENT_CREATE,
            ANNOUNCEMENT_DELETE,

            TENANT_USER_CREATE,
            OWNER_USER_CREATE,
            OWNER_USER_UPDATE
    )),
    TENANT(Set.of(
            TENANT_SPECIFIC_PERM,
            SEMI_PERM,

            APARTMENTS_READ,

            RENT_CONTRACT_READ,

            CONTRACT_READ,

            RENT_PROPERTY_PHOTO_READ,

            TENANT_READ,

            APPEAL_CREATE,
            APPEAL_UPDATE,
            APPEAL_DELETE,

            ANNOUNCEMENT_READ,

            TENANT_USER_UPDATE
    ));

    private final Set<Permission> permissions;

    Role(Set<Permission> permissions){
        this.permissions = permissions;
    }
    public Set<Permission> getPermissions() {
        return permissions;
    }

    public Set<SimpleGrantedAuthority> getAuthorities(){
        return this.permissions
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.toString()))
                .collect(Collectors.toSet());
    }
}
