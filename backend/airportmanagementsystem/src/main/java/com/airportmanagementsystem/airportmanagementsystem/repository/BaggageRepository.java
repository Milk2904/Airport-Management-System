package com.airportmanagementsystem.airportmanagementsystem.repository;

import com.airportmanagementsystem.airportmanagementsystem.entity.Baggage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BaggageRepository extends JpaRepository<Baggage, Long> {
}