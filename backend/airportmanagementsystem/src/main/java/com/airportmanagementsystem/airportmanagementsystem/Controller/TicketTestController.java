package com.airportmanagementsystem.airportmanagementsystem.Controller;

import com.airportmanagementsystem.airportmanagementsystem.entity.Ticket;
import com.airportmanagementsystem.airportmanagementsystem.service.ticketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/test/tickets")
public class TicketTestController {

    private final ticketService service;

    public TicketTestController(ticketService service) {
        this.service = service;
    }

    // GET all
    @GetMapping
    public List<Ticket> getAll() {
        return service.getAllTickets();
    }

    // GET by passenger
    @GetMapping("/passenger/{id}")
    public List<Ticket> getByPassenger(@PathVariable Long id) {
        return service.getByPassenger(id);
    }

    // check seat
    @GetMapping("/check")
    public String checkSeat(@RequestParam Long scheduleId,
                            @RequestParam Long seatId) {

        boolean booked = service.isSeatBooked(scheduleId, seatId);
        return booked ? "Seat already booked ❌" : "Seat available ✅";
    }
}