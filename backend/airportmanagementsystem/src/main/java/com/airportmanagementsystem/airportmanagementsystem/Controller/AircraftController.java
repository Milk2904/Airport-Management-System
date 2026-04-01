package com.airportmanagementsystem.airportmanagementsystem.controller;


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

import com.airportmanagementsystem.airportmanagementsystem.entity.Aircraft;
import com.airportmanagementsystem.airportmanagementsystem.service.AircraftService;

@RestController
@RequestMapping("/aircraft")
public class AircraftController {

    @Autowired
    private AircraftService aircraftService;

    @PostMapping
    public Aircraft create(@RequestBody Aircraft aircraft) {
        return aircraftService.create(aircraft);
    }

    @GetMapping
    public List<Aircraft> getAll() {
        return aircraftService.getAll();
    }

    @GetMapping("/{id}")
    public Aircraft getById(@PathVariable Long id) {
        return aircraftService.getById(id);
    }

    @PutMapping("/{id}")
    public Aircraft update(@PathVariable Long id, @RequestBody Aircraft aircraft) {
        return aircraftService.update(id, aircraft);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        aircraftService.delete(id);
    }
}
