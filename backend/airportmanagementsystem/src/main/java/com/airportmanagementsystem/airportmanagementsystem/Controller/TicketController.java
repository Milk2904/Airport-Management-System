package com.airportmanagementsystem.airportmanagementsystem.controller;

import com.airportmanagementsystem.airportmanagementsystem.dto.request.TicketRequest;
import com.airportmanagementsystem.airportmanagementsystem.entity.Ticket;
import com.airportmanagementsystem.airportmanagementsystem.service.TicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public List<Ticket> getAll() {
        return ticketService.getAll();
    }

    @GetMapping("/{id}")
    public Ticket getById(@PathVariable Long id) {
        return ticketService.getById(id);
    }

    @PostMapping
    public Ticket create(@RequestBody TicketRequest req) {
        return ticketService.create(req);
    }

    @PutMapping("/{id}")
    public Ticket update(@PathVariable Long id, @RequestBody TicketRequest req) {
        return ticketService.update(id, req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        ticketService.delete(id);
    }
}