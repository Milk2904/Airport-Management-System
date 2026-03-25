package com.airportmanagementsystem.airportmanagementsystem.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "airport")
public class AirportEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long airportId;

    @Column(nullable = false, unique = true)
    private String iataCode;

    private String name;
    private String city;
    private String country;

    @OneToMany(mappedBy = "departureAirport")
    private List<FlightEntity> departingFlights;

    @OneToMany(mappedBy = "arrivalAirport")
    private List<FlightEntity> arrivingFlights;

    @OneToMany(mappedBy = "airport")
    private List<GateEntity> gates;

    public Long getAirportId() {
        return airportId;
    }
    public void setAirportId(Long airportId) {
        this.airportId = airportId;
    }
    public String getIataCode() {
        return iataCode;
    }
    public void setIataCode(String iataCode) {
        this.iataCode = iataCode;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public String getCountry() {
        return country;
    }
    public void setCountry(String country) {
        this.country = country;
    }
    public List<FlightEntity> getDepartingFlights() {
        return departingFlights;
    }
    public void setDepartingFlights(List<FlightEntity> departingFlights) {
        this.departingFlights = departingFlights;
    }
    public List<FlightEntity> getArrivingFlights() {
        return arrivingFlights;
    }
    public void setArrivingFlights(List<FlightEntity> arrivingFlights) {
        this.arrivingFlights = arrivingFlights;
    }
    public List<GateEntity> getGates() {
        return gates;
    }
    public void setGates(List<GateEntity> gates) {
        this.gates = gates;
    }
}
