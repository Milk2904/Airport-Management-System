package com.airportmanagementsystem.airportmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.airportmanagementsystem.airportmanagementsystem.entity.Aircraft;

public interface AircraftRepository extends JpaRepository<Aircraft, Long> {

}
