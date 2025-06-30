package com.example.deploydemo.repository.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "contract")
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;
    @Column(name = "file_name")
    private String name;
    @Column(name = "file_type")
    private String type;
    @Column(name = "data")
    private byte[] data;
    @OneToOne
    @JoinColumn(name = "contract_id")
    private RentContract rentContract;
}
