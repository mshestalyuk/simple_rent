package com.example.deploydemo.service.util;

import com.example.deploydemo.repository.daos.UserRepository;
import com.example.deploydemo.repository.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserUtil {
    private final UserRepository userRepository;
    public Long getUserIdFromContext() {
        Long userId;
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!userName.equals("anonymousUser")) {
            userId = userRepository.findByEmail(userName).orElseThrow(
                    () -> new UsernameNotFoundException("User not found")
            ).getId();
        } else userId = -1L;
        return userId;
    }

    public User getUserFromContext() {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(userName).orElseThrow(
                () -> new UsernameNotFoundException("User not found"));
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(
                () -> new UsernameNotFoundException(String.format("User with id = %s not found", id))
        );
    }
}
