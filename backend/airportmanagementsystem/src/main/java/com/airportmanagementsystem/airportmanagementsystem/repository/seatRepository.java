package com.airportmanagementsystem.airportmanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.airportmanagementsystem.airportmanagementsystem.entity.Seat;
@Repository
public interface seatRepository extends JpaRepository <Seat ,Long> {
List<Seat> findByAircraft_AircraftId(Long aircraftId);

    // 🔍 lấy ghế theo status (AVAILABLE, BOOKED)
    List<Seat> findByStatus(String status);

    // 🔍 tìm theo seat number
    List<Seat> findBySeatNumber(String seatNumber);
}

