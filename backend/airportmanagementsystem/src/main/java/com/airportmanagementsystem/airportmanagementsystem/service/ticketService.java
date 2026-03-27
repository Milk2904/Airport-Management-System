package com.airportmanagementsystem.airportmanagementsystem.service;

import com.airportmanagementsystem.airportmanagementsystem.dto.request.CreateTicketRequest;
import com.airportmanagementsystem.airportmanagementsystem.entity.Employee;
import com.airportmanagementsystem.airportmanagementsystem.entity.FlightSchedule;
import com.airportmanagementsystem.airportmanagementsystem.entity.Passenger;
import com.airportmanagementsystem.airportmanagementsystem.entity.Seat;
import com.airportmanagementsystem.airportmanagementsystem.entity.Ticket;
import com.airportmanagementsystem.airportmanagementsystem.repository.PassengerRepository;
import com.airportmanagementsystem.airportmanagementsystem.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private PassengerRepository passengerRepository;
    // @Autowired
    // private FlightScheduleRepository scheduleRepository;
    // @Autowired
    // private SeatRepository seatRepository;
    // @Autowired
    // private EmployeeRepository employeeRepository;

    public Ticket createTicket(CreateTicketRequest req) {

        Passenger passenger = passengerRepository.findById(req.getPassengerId())
                .orElseThrow(() -> new RuntimeException("Passenger not found"));

        // FlightSchedule schedule = scheduleRepository.findById(req.getScheduleId())
        // .orElseThrow(() -> new RuntimeException("Schedule not found"));

        // Seat seat = seatRepository.findById(req.getSeatId())
        // .orElseThrow(() -> new RuntimeException("Seat not found"));

        // Employee employee = employeeRepository.findById(req.getEmployeeId())
        // .orElseThrow(() -> new RuntimeException("Employee not found"));

        Ticket ticket = new Ticket();
        ticket.setPassenger(passenger);
        // ticket.setSchedule(schedule);
        // ticket.setSeat(seat);
        // ticket.setEmployee(employee);
        ticket.setPrice(req.getPrice());
        ticket.setStatus(req.getStatus() != null ? req.getStatus() : "BOOKED");
        ticket.setCreatedAt(LocalDateTime.now());

        return ticketRepository.save(ticket);
    }

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    // public List<Ticket> getByPassenger(Long passengerId) {
    // return ticketRepository.findByPassenger_PassengerId(passengerId);
    // }

    // // test check seat
    // public boolean isSeatBooked(Long scheduleId, Long seatId) {
    // return ticketRepository.existsBySchedule_ScheduleIdAndSeat_SeatId(scheduleId,
    // seatId);
    // }
}