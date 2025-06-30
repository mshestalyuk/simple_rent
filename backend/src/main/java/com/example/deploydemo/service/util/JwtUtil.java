package com.example.deploydemo.service.util;

import com.example.deploydemo.service.security.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.*;

import static com.example.deploydemo.service.security.Permission.OWNER_SPECIFIC_PERM;
import static com.example.deploydemo.service.security.Permission.TENANT_SPECIFIC_PERM;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.lifetime}")
    private Duration jwtLifetime;

    public String generateToken(UserDetails userDetails) {
        Map<String, List<String>> claims = new HashMap<>();
        List<String> authorities = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        if (authorities.contains(TENANT_SPECIFIC_PERM.toString())) {
            claims.put("roles", List.of("TENANT"));
        } else if (authorities.contains(OWNER_SPECIFIC_PERM.toString())) {
            claims.put("roles", List.of("OWNER"));
        } else claims.put("roles", List.of("ADMIN"));

        Date issuedDate = new Date();
        Date expiresDate = new Date(issuedDate.getTime() + jwtLifetime.toMillis());
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .claims(claims)
                .issuedAt(issuedDate)
                .expiration(expiresDate)
                .signWith(getSigningKey())
                .compact();

    }

    public String getEmailFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }

    public List<SimpleGrantedAuthority> getAuthoritiesFromToken(String token) {
         List<String> roles = getClaimsFromToken(token).get("roles", List.class);
         return roles.stream().map(role->Role.valueOf(role).getAuthorities())
                 .flatMap(Set::stream)
                 .toList();

    }

    private Claims getClaimsFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
