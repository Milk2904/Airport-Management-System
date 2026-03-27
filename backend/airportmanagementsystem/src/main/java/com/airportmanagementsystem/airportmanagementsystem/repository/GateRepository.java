package com.airportmanagementsystem.airportmanagementsystem.repository;

import com.airportmanagementsystem.airportmanagementsystem.entity.Gate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GateRepository extends JpaRepository<Gate, Long> {
}