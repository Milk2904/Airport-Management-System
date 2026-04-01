package com.airportmanagementsystem.airportmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.airportmanagementsystem.airportmanagementsystem.entity.Airport;
import java.util.Optional;

public interface AirportRepository extends JpaRepository<Airport, Long> {
    Optional<Airport> findByCode(String code);
}
