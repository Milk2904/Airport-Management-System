package com.airportmanagementsystem.airportmanagementsystem.controller;

import com.airportmanagementsystem.airportmanagementsystem.dto.request.FlightScheduleCrewRequest;
import com.airportmanagementsystem.airportmanagementsystem.entity.FlightScheduleCrew;
import com.airportmanagementsystem.airportmanagementsystem.service.FlightScheduleCrewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schedule-crew")
@CrossOrigin(origins = "*")
public class FlightScheduleCrewController {

    private final FlightScheduleCrewService service;

    public FlightScheduleCrewController(FlightScheduleCrewService service) {
        this.service = service;
    }

    @GetMapping
    public List<FlightScheduleCrew> getAll() {
        return service.getAll();
    }

    @PostMapping
    public FlightScheduleCrew create(@RequestBody FlightScheduleCrewRequest req) {
        return service.create(req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}