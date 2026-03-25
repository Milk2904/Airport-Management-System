package com.airportmanagementsystem.airportmanagementsystem.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name = "crew")
public class CrewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long crewId;
    private String firstName;
    private String lastName;
    private String role;

    @ManyToOne
    @JoinColumn(name = "flight_id")
    private FlightEntity flight;

    // Getters and Setters
    public Long getCrewId() {
        return crewId;
    }

    public void setCrewId(Long crewId) {
        this.crewId = crewId;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public FlightEntity getFlight() {
        return flight;
    }
    public void setFlight(FlightEntity flight) {
        this.flight = flight;
    }

}
