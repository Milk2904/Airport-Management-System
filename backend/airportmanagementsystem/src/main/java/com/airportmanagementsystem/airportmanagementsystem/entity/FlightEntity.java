package com.airportmanagementsystem.airportmanagementsystem.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "flight")
public class FlightEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long flightId;

    @Column(nullable = false, unique = true)
    private String flightNumber;

    @ManyToOne
    @JoinColumn(name = "airline_id")
    private AirlineEntity airline;

    @ManyToOne
    @JoinColumn(name = "departure_airport_id")
    private AirportEntity departureAirport;

    @ManyToOne
    @JoinColumn(name = "arrival_airport_id")
    private AirportEntity arrivalAirport;

    @ManyToOne
    @JoinColumn(name = "gate_id")
    private GateEntity gate;

    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private String status;

    @OneToMany(mappedBy = "flight")
    private List<CrewEntity> crews;

    @OneToMany(mappedBy = "flight")
    private List<TicketEntity> tickets;

    @OneToMany(mappedBy = "flight")
    private List<BaggageEntity> baggages;

    public Long getFlightId() {
        return flightId;
    }
    public void setFlightId(Long flightId) {
        this.flightId = flightId;
    }
    public String getFlightNumber() {
        return flightNumber;
    }
    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }
    public AirlineEntity getAirline() {
        return airline;
    }
    public void setAirline(AirlineEntity airline) {
        this.airline = airline;
    }
    public AirportEntity getDepartureAirport() {
        return departureAirport;
    }
    public void setDepartureAirport(AirportEntity departureAirport) {
        this.departureAirport = departureAirport;
    }
    public AirportEntity getArrivalAirport() {
        return arrivalAirport;
    }
    public void setArrivalAirport(AirportEntity arrivalAirport) {
        this.arrivalAirport = arrivalAirport;
    }
    public GateEntity getGate() {
        return gate;
    }
    public void setGate(GateEntity gate) {
        this.gate = gate;
    }
    public LocalDateTime getDepartureTime() {
        return departureTime;
    }
    public void setDepartureTime(LocalDateTime departureTime) {
        this.departureTime = departureTime;
    }
    public LocalDateTime getArrivalTime() {
        return arrivalTime;
    }
    public void setArrivalTime(LocalDateTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public List<CrewEntity> getCrews() {
        return crews;
    }
    public void setCrews(List<CrewEntity> crews) {
        this.crews = crews;
    }
    public List<TicketEntity> getTickets() {
        return tickets;
    }
    public void setTickets(List<TicketEntity> tickets) {
        this.tickets = tickets;
    }
    public List<BaggageEntity> getBaggages() {
        return baggages;
    }
    public void setBaggages(List<BaggageEntity> baggages) {
        this.baggages = baggages;
    }
}