package com.airportmanagementsystem.airportmanagementsystem.controller;

import com.airportmanagementsystem.airportmanagementsystem.entity.Flight;
import com.airportmanagementsystem.airportmanagementsystem.service.FlightService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/flights")
public class FlightController {

    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping
    public List<Flight> getAll() {
        return flightService.getAll();
    }

    @GetMapping("/{id}")
    public Flight getById(@PathVariable Long id) {
        return flightService.getById(id);
    }

    @PostMapping
    public Flight create(
            @RequestBody Flight flight,
            @RequestParam Long departureId,
            @RequestParam Long arrivalId,
            @RequestParam Long airlineId) {
        return flightService.create(flight, departureId, arrivalId, airlineId);
    }

    @PutMapping("/{id}")
    public Flight update(@PathVariable Long id, @RequestBody Flight flight) {
        return flightService.update(id, flight);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        flightService.delete(id);
        return "Deleted flight " + id;
    }
}