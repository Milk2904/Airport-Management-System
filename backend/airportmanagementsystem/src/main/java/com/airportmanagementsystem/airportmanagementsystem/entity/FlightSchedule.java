package com.airportmanagementsystem.airportmanagementsystem.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "flight_schedule")
public class FlightSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;

    @ManyToOne
    private Flight flight;

    @ManyToOne
    private Aircraft aircraft;

    @ManyToOne
    private Gate gate;

    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;

    private String status;
}