package com.airportmanagementsystem.airportmanagementsystem.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "ticket")
public class TicketEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;

    @Column(nullable = false, unique = true)
    private String ticketNumber;

    private String seatNumber;
    private String boardingGroup;
    private String status;

    @ManyToOne
    @JoinColumn(name = "passenger_id")
    private PassengerEntity passenger;

    @ManyToOne
    @JoinColumn(name = "flight_id")
    private FlightEntity flight;

    @ManyToOne
    @JoinColumn(name = "gate_id")
    private GateEntity gate;

    @OneToMany(mappedBy = "ticket")
    private List<BaggageEntity> baggages;

    public Long getTicketId() {
        return ticketId;
    }
    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }
    public String getTicketNumber() {
        return ticketNumber;
    }
    public void setTicketNumber(String ticketNumber) {
        this.ticketNumber = ticketNumber;
    }
    public String getSeatNumber() {
        return seatNumber;
    }
    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }
    public String getBoardingGroup() {
        return boardingGroup;
    }
    public void setBoardingGroup(String boardingGroup) {
        this.boardingGroup = boardingGroup;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public PassengerEntity getPassenger() {
        return passenger;
    }
    public void setPassenger(PassengerEntity passenger) {
        this.passenger = passenger;
    }
    public FlightEntity getFlight() {
        return flight;
    }
    public void setFlight(FlightEntity flight) {
        this.flight = flight;
    }
    public GateEntity getGate() {
        return gate;
    }
    public void setGate(GateEntity gate) {
        this.gate = gate;
    }
    public List<BaggageEntity> getBaggages() {
        return baggages;
    }
    public void setBaggages(List<BaggageEntity> baggages) {
        this.baggages = baggages;
    }
}
