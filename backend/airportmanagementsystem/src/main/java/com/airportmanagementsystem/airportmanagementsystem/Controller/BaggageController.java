package com.airportmanagementsystem.airportmanagementsystem.controller;

import com.airportmanagementsystem.airportmanagementsystem.entity.Baggage;
import com.airportmanagementsystem.airportmanagementsystem.service.BaggageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/baggage")
public class BaggageController {

    private final BaggageService baggageService;

    public BaggageController(BaggageService baggageService) {
        this.baggageService = baggageService;
    }

    @GetMapping
    public List<Baggage> getAll() {
        return baggageService.getAll();
    }

    @GetMapping("/{id}")
    public Baggage getById(@PathVariable Long id) {
        return baggageService.getById(id);
    }

    @PostMapping
    public Baggage create(@RequestBody Baggage baggage) {
        return baggageService.create(baggage);
    }

    @PutMapping("/{id}")
    public Baggage update(@PathVariable Long id, @RequestBody Baggage baggage) {
        return baggageService.update(id, baggage);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        baggageService.delete(id);
    }
}