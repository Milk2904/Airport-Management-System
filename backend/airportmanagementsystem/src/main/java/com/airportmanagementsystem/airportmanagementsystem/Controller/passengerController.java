package com.airportmanagementsystem.airportmanagementsystem.controller;

import com.airportmanagementsystem.airportmanagementsystem.entity.Passenger;
import com.airportmanagementsystem.airportmanagementsystem.service.PassengerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/passengers")
public class PassengerController {

    private final PassengerService passengerService;

    public PassengerController(PassengerService passengerService) {
        this.passengerService = passengerService;
    }

    @GetMapping
    public List<Passenger> getAll() {
        return passengerService.getAll();
    }

    @GetMapping("/{id}")
    public Passenger getById(@PathVariable Long id) {
        return passengerService.getById(id);
    }

    @PostMapping
    public Passenger create(@RequestBody Passenger passenger) {
        return passengerService.create(passenger);
    }

    @PutMapping("/{id}")
    public Passenger update(@PathVariable Long id, @RequestBody Passenger passenger) {
        return passengerService.update(id, passenger);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        passengerService.delete(id);
    }
}