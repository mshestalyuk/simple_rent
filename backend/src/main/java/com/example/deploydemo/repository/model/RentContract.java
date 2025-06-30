package com.example.deploydemo.repository.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "rent_contract")
public class RentContract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "conclusion_date")
    private Date conclusionDate;
    @Column(name = "expires_date")
    private Date expiresDate;
    @Column(name = "month_payment")
    private Double montPayment;
    @Column(name = "note")
    private String note;
    @ManyToOne
    @JoinColumn(name = "apartment_id")
    private Apartment apartment;
    @OneToOne
    @JoinColumn(name = "resident_user")
    private User residentUser;
    @OneToMany(mappedBy = "rentContract")
    private List<Tenant> tenants;
    @OneToOne(mappedBy = "rentContract")
    private Contract document;
}
