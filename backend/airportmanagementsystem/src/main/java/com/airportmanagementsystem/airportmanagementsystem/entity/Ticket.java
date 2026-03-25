package com.airportmanagementsystem.airportmanagementsystem.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Table(name = "ticket",
       uniqueConstraints = @UniqueConstraint(columnNames = {"schedule_id", "seat_id"}))
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;

    @ManyToOne
    private Passenger passenger;

    @ManyToOne
    private FlightSchedule schedule;

    @ManyToOne
    private Seat seat;

    @ManyToOne
    private Employee employee;

    private Double price;
    private String status;
    private LocalDateTime createdAt;
}