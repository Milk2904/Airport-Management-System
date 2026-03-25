package com.airportmanagementsystem.airportmanagementsystem.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "gate")
public class GateEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gateId;

    @Column(nullable = false, unique = true)
    private String gateCode;

    private String terminal;
    private String status;

    @ManyToOne
    @JoinColumn(name = "airport_id")
    private AirportEntity airport;

    @OneToMany(mappedBy = "gate")
    private List<FlightEntity> flights;

    public Long getGateId() {
        return gateId;
    }
    public void setGateId(Long gateId) {
        this.gateId = gateId;
    }
    public String getGateCode() {
        return gateCode;
    }
    public void setGateCode(String gateCode) {
        this.gateCode = gateCode;
    }
    public String getTerminal() {
        return terminal;
    }
    public void setTerminal(String terminal) {
        this.terminal = terminal;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public AirportEntity getAirport() {
        return airport;
    }
    public void setAirport(AirportEntity airport) {
        this.airport = airport;
    }
    public List<FlightEntity> getFlights() {
        return flights;
    }
    public void setFlights(List<FlightEntity> flights) {
        this.flights = flights;
    }
}
