package com.airportmanagementsystem.airportmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.airportmanagementsystem.airportmanagementsystem.entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}