package com.airportmanagementsystem.airportmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.airportmanagementsystem.airportmanagementsystem.entity.Ticket;
import com.airportmanagementsystem.airportmanagementsystem.entity.FlightSchedule;
import com.airportmanagementsystem.airportmanagementsystem.entity.Seat;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    boolean existsByScheduleAndSeat(FlightSchedule schedule, Seat seat);
}