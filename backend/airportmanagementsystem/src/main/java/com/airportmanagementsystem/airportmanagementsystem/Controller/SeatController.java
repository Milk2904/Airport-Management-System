package com.airportmanagementsystem.airportmanagementsystem.controller;

import com.airportmanagementsystem.airportmanagementsystem.dto.request.CreateSeatRequest;
import com.airportmanagementsystem.airportmanagementsystem.dto.response.SeatResponse;
import com.airportmanagementsystem.airportmanagementsystem.entity.Seat;
import com.airportmanagementsystem.airportmanagementsystem.service.SeatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("seats")
public class SeatController {

    private final SeatService seatService;

    public SeatController(SeatService seatService) {
        this.seatService = seatService;
    }

    @PostMapping
    public SeatResponse create(@RequestBody CreateSeatRequest request) {
        return seatService.create(request);
    }

    @GetMapping("/{id}")
    public SeatResponse getById(@PathVariable Long id) {
        return seatService.getById(id);
    }

    @GetMapping
    public List<Seat> getAll() {
        return seatService.getAll();
    }

    @PutMapping("/{id}")
    public SeatResponse update(@PathVariable Long id, @RequestBody CreateSeatRequest request) {
        return seatService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        seatService.delete(id);
    }
}