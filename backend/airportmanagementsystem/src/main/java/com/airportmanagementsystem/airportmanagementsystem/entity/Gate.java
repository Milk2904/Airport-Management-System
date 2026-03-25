package com.airportmanagementsystem.airportmanagementsystem.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "gate")
public class Gate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gateId;

    @Column(nullable = false, unique = true)
    private String gateCode;

    private String terminal;
    private String status;

    @ManyToOne
    @JoinColumn(name = "airport_id")
    private Airport airport;

    @OneToMany(mappedBy = "gate")
    private List<Flight> flights;

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
    public Airport getAirport() {
        return airport;
    }
    public void setAirport(Airport airport) {
        this.airport = airport;
    }
    public List<Flight> getFlights() {
        return flights;
    }
    public void setFlights(List<Flight> flights) {
        this.flights = flights;
    }
}
