package com.airportmanagementsystem.airportmanagementsystem.service;

import com.airportmanagementsystem.airportmanagementsystem.entity.*;
import com.airportmanagementsystem.airportmanagementsystem.repository.*;
import com.airportmanagementsystem.airportmanagementsystem.dto.request.TicketRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final PassengerRepository passengerRepository;
    private final FlightScheduleRepository flightScheduleRepository;
    private final SeatRepository seatRepository;
    private final EmployeeRepository employeeRepository;

    public TicketService(
            TicketRepository ticketRepository,
            PassengerRepository passengerRepository,
            FlightScheduleRepository flightScheduleRepository,
            SeatRepository seatRepository,
            EmployeeRepository employeeRepository) {
        this.ticketRepository = ticketRepository;
        this.passengerRepository = passengerRepository;
        this.flightScheduleRepository = flightScheduleRepository;
        this.seatRepository = seatRepository;
        this.employeeRepository = employeeRepository;
    }

    public List<Ticket> getAll() {
        return ticketRepository.findAll();
    }

    public Ticket getById(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
    }

    public Ticket create(TicketRequest req) {
        Ticket ticket = new Ticket();

        ticket.setPassenger(passengerRepository.findById(req.getPassengerId())
                .orElseThrow(() -> new RuntimeException("Passenger not found")));

        ticket.setSchedule(flightScheduleRepository.findById(req.getScheduleId())
                .orElseThrow(() -> new RuntimeException("Schedule not found")));

        ticket.setSeat(seatRepository.findById(req.getSeatId())
                .orElseThrow(() -> new RuntimeException("Seat not found")));

        ticket.setEmployee(employeeRepository.findById(req.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found")));

        ticket.setPrice(req.getPrice());
        ticket.setStatus(req.getStatus());
        ticket.setCreatedAt(LocalDateTime.now());

        return ticketRepository.save(ticket);
    }

    public Ticket update(Long id, TicketRequest req) {
        Ticket ticket = getById(id);

        ticket.setPassenger(passengerRepository.findById(req.getPassengerId())
                .orElseThrow(() -> new RuntimeException("Passenger not found")));

        ticket.setSchedule(flightScheduleRepository.findById(req.getScheduleId())
                .orElseThrow(() -> new RuntimeException("Schedule not found")));

        ticket.setSeat(seatRepository.findById(req.getSeatId())
                .orElseThrow(() -> new RuntimeException("Seat not found")));

        ticket.setEmployee(employeeRepository.findById(req.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found")));

        ticket.setPrice(req.getPrice());
        ticket.setStatus(req.getStatus());

        return ticketRepository.save(ticket);
    }

    public void delete(Long id) {
        ticketRepository.deleteById(id);
    }
}