package com.airportmanagementsystem.airportmanagementsystem.controller;

import com.airportmanagementsystem.airportmanagementsystem.dto.request.CreateTicketRequest;
import com.airportmanagementsystem.airportmanagementsystem.dto.response.ApiResponse;
import com.airportmanagementsystem.airportmanagementsystem.entity.Ticket;
import com.airportmanagementsystem.airportmanagementsystem.service.TicketService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ticket")
public class TicketTestController {
    @Autowired
    private TicketService ticketService;

    public TicketTestController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ApiResponse<Ticket> create(@RequestBody CreateTicketRequest request) {

        ApiResponse<Ticket> response = new ApiResponse<>();

        Ticket ticket = ticketService.createTicket(request);

        response.setResult(ticket);

        return response;
    }

    // @GetMapping
    // ApiResponse<Ticket> getAll() {
    // ApiResponse<Ticket> apiResponse = new ApiResponse<>();

    // apiResponse.setResult(ticketService.getAllTickets());
    // return apiResponse;
    // }

    // // GET by passenger
    // @GetMapping("/passenger/{id}")
    // public List<Ticket> getByPassenger(@PathVariable Long id) {
    // return ticketService.getByPassenger(id);
    // }

    // // check seat
    // @GetMapping("/check")
    // public String checkSeat(@RequestParam Long scheduleId,
    // @RequestParam Long seatId) {

    // boolean booked = ticketService.isSeatBooked(scheduleId, seatId);
    // return booked ? "Seat already booked ❌" : "Seat available ✅";
    // }
}