package com.airportmanagementsystem.airportmanagementsystem.Controller;

import com.airportmanagementsystem.airportmanagementsystem.dto.request.FlightScheduleRequest;
import com.airportmanagementsystem.airportmanagementsystem.entity.FlightSchedule;
import com.airportmanagementsystem.airportmanagementsystem.service.FlightScheduleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schedules")
@CrossOrigin(origins = "*")
public class FlightScheduleController {

    private final FlightScheduleService service;

    public FlightScheduleController(FlightScheduleService service) {
        this.service = service;
    }

    @GetMapping
    public List<FlightSchedule> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public FlightSchedule get(@PathVariable Long id) {
        return service.get(id);
    }

    @PostMapping
    public FlightSchedule create(@RequestBody FlightScheduleRequest req) {
        return service.create(req);
    }

    @PutMapping("/{id}")
    public FlightSchedule update(@PathVariable Long id, @RequestBody FlightScheduleRequest req) {
        return service.update(id, req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}