package com.airportmanagementsystem.airportmanagementsystem.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "flight_schedule_crew",
       uniqueConstraints = @UniqueConstraint(columnNames = {"schedule_id", "crew_id"}))
public class FlightScheduleCrew {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private FlightSchedule schedule;

    @ManyToOne
    private Crew crew;
}