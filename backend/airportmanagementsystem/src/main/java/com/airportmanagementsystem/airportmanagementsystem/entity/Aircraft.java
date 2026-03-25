package com.airportmanagementsystem.airportmanagementsystem.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Setter
@Getter
@Table(name = "aircraft")
public class Aircraft {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long aircraftId;

    private String airlineName;
    private String airlineCode;
    private String model;
    private Integer capacity;
    private Integer manufactureYear;
    private String status;

    // getters/setters
}