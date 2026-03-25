package com.airportmanagementsystem.airportmanagementsystem.service;



import com.airportmanagementsystem.airportmanagementsystem.entity.Ticket;
import com.airportmanagementsystem.airportmanagementsystem.repository.ticketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ticketService {

    private final ticketRepository ticketRepositorys;

    public ticketService(ticketRepository ticketRepositorys) {
        this.ticketRepositorys = ticketRepositorys;
    }

    // test get all
    public List<Ticket> getAllTickets() {
        return ticketRepositorys.findAll();
    }

    // test find by pas senger
    public List<Ticket> getByPassenger(Long passengerId) {
        return ticketRepositorys.findByPassenger_PassengerId(passengerId);
    }

    // test check seat
    public boolean isSeatBooked(Long scheduleId, Long seatId) {
        return ticketRepositorys.existsBySchedule_ScheduleIdAndSeat_SeatId(scheduleId, seatId);
    }
}