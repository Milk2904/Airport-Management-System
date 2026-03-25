package com.airportmanagementsystem.airportmanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.airportmanagementsystem.airportmanagementsystem.entity.Flight;
import com.airportmanagementsystem.airportmanagementsystem.entity.Seat;

public interface filghtService extends JpaRepository <Flight, Long> {
    List<Seat> findByAircraft_AircraftId(Long aircraftId);
    List<Seat> findByStatus(String status);
    List<Seat> findBySeatNumber(String seatNumber);
}
    

