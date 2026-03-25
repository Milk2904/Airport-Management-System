package com.airportmanagementsystem.airportmanagementsystem.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "baggage")
public class BaggageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long baggageId;

    @Column(nullable = false, unique = true)
    private String baggageTag;

    private double weight;

    @ManyToOne
    @JoinColumn(name = "passenger_id")
    private PassengerEntity passenger;

    @ManyToOne
    @JoinColumn(name = "flight_id")
    private FlightEntity flight;

    @ManyToOne
    @JoinColumn(name = "ticket_id")
    private TicketEntity ticket;

    public Long getBaggageId() {
        return baggageId;
    }
    public void setBaggageId(Long baggageId) {
        this.baggageId = baggageId;
    }
    public String getBaggageTag() {
        return baggageTag;
    }
    public void setBaggageTag(String baggageTag) {
        this.baggageTag = baggageTag;
    }
    public double getWeight() {
        return weight;
    }
    public void setWeight(double weight) {
        this.weight = weight;
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
    public TicketEntity getTicket() {
        return ticket;
    }
    public void setTicket(TicketEntity ticket) {
        this.ticket = ticket;
    }
}
