package com.example.deploydemo.service.security;

import com.example.deploydemo.repository.daos.UserRepository;
import com.example.deploydemo.repository.model.User;
import com.example.deploydemo.service.RoleService;
import com.example.deploydemo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
@Component
@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {
    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userService.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("" +
                String.format("User with email '%s' is not found", email)));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                getUserAuthorities(user)
        );
    }

    private Set<SimpleGrantedAuthority> getUserAuthorities(User user){
        return user.getRoles()
                .stream()
                .map(role -> Role.valueOf(role.getName()).getAuthorities())
                .flatMap(Set::stream)
                .collect(Collectors.toSet());
    }
}
