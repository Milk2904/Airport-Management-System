package com.airportmanagementsystem.airportmanagementsystem.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Entity

@Setter
@Getter
@Table(name = "seat",
       uniqueConstraints = @UniqueConstraint(columnNames = {"aircraft_id", "seat_number"}))
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seatId;

    @ManyToOne
    @JoinColumn(name = "aircraft_id")
    private Aircraft aircraft;

    private String seatNumber;
    private String seatClass;
    private String status;
}