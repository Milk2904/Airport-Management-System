package com.airportmanagementsystem.airportmanagementsystem.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "airline")
public class Airline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long airlineId;

    private String airlineName;

    private String country;

    @OneToMany(mappedBy = "airline")
    private List<Flight> flights;

}