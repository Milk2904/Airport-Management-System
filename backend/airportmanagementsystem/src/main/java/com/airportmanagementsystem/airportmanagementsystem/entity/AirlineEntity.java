package com.airportmanagementsystem.airportmanagementsystem.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "airline")
public class AirlineEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long airlineId;

    private String airlineName;

    private String country;

    @OneToMany(mappedBy = "airline")
    private List<FlightEntity> flights;

    public Long getAirlineId() {
        return airlineId;
    }

    public void setAirlineId(Long airlineId) {
        this.airlineId = airlineId;
    }

    public String getAirlineName() {
        return airlineName;
    }

    public void setAirlineName(String airlineName) {
        this.airlineName = airlineName;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}