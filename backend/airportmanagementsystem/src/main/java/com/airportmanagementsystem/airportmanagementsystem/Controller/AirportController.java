package com.airportmanagementsystem.airportmanagementsystem.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.airportmanagementsystem.airportmanagementsystem.entity.Airport;
import com.airportmanagementsystem.airportmanagementsystem.service.AirportService;

@RestController
@RequestMapping("airports")
public class AirportController {

    @Autowired
    private AirportService airportService;

    @PostMapping
    public Airport create(@RequestBody Airport airport) {
        return airportService.create(airport);
    }

    @GetMapping
    public List<Airport> getAll() {
        return airportService.getAll();
    }

    @GetMapping("/{id}")
    public Airport getById(@PathVariable Long id) {
        return airportService.getById(id);
    }

    @PutMapping("/{id}")
    public Airport update(@PathVariable Long id, @RequestBody Airport airport) {
        return airportService.update(id, airport);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        airportService.delete(id);
    }
}