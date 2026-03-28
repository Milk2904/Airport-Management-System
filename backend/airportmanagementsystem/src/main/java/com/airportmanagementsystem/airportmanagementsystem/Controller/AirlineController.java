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

import com.airportmanagementsystem.airportmanagementsystem.entity.Airline;
import com.airportmanagementsystem.airportmanagementsystem.service.AirlineService;

@RestController
@RequestMapping("/airlines")
public class AirlineController {

    @Autowired
    private AirlineService airlineService;

    @PostMapping
    public Airline create(@RequestBody Airline airline) {
        return airlineService.create(airline);
    }

    @GetMapping
    public List<Airline> getAll() {
        return airlineService.getAll();
    }

    @GetMapping("/{id}")
    public Airline getById(@PathVariable Long id) {
        return airlineService.getById(id);
    }

    @PutMapping("/{id}")
    public Airline update(@PathVariable Long id, @RequestBody Airline airline) {
        return airlineService.update(id, airline);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        airlineService.delete(id);
    }
}
