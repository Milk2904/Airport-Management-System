package com.airportmanagementsystem.airportmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.airportmanagementsystem.airportmanagementsystem.entity.FlightScheduleCrew;

public interface FlightScheduleCrewRepository extends JpaRepository<FlightScheduleCrew, Long> {
}