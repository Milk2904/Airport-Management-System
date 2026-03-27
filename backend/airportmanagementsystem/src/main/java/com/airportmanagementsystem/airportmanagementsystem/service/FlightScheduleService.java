package com.airportmanagementsystem.airportmanagementsystem.service;

import com.airportmanagementsystem.airportmanagementsystem.dto.request.FlightScheduleRequest;
import com.airportmanagementsystem.airportmanagementsystem.entity.*;
import com.airportmanagementsystem.airportmanagementsystem.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightScheduleService {

    private final FlightScheduleRepository scheduleRepo;
    private final FlightRepository flightRepo;
    private final AircraftRepository aircraftRepo;
    private final GateRepository gateRepo;

    public FlightScheduleService(
            FlightScheduleRepository scheduleRepo,
            FlightRepository flightRepo,
            AircraftRepository aircraftRepo,
            GateRepository gateRepo) {
        this.scheduleRepo = scheduleRepo;
        this.flightRepo = flightRepo;
        this.aircraftRepo = aircraftRepo;
        this.gateRepo = gateRepo;
    }

    public List<FlightSchedule> getAll() {
        return scheduleRepo.findAll();
    }

    public FlightSchedule get(Long id) {
        return scheduleRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found"));
    }

    public FlightSchedule create(FlightScheduleRequest req) {
        FlightSchedule fs = new FlightSchedule();

        fs.setFlight(flightRepo.findById(req.getFlightId())
                .orElseThrow(() -> new RuntimeException("Flight not found")));

        fs.setAircraft(aircraftRepo.findById(req.getAircraftId())
                .orElseThrow(() -> new RuntimeException("Aircraft not found")));

        fs.setGate(gateRepo.findById(req.getGateId())
                .orElseThrow(() -> new RuntimeException("Gate not found")));

        fs.setDepartureTime(req.getDepartureTime());
        fs.setArrivalTime(req.getArrivalTime());
        fs.setStatus(req.getStatus());

        return scheduleRepo.save(fs);
    }

    public FlightSchedule update(Long id, FlightScheduleRequest req) {
        FlightSchedule fs = get(id);

        fs.setFlight(flightRepo.findById(req.getFlightId())
                .orElseThrow(() -> new RuntimeException("Flight not found")));

        fs.setAircraft(aircraftRepo.findById(req.getAircraftId())
                .orElseThrow(() -> new RuntimeException("Aircraft not found")));

        fs.setGate(gateRepo.findById(req.getGateId())
                .orElseThrow(() -> new RuntimeException("Gate not found")));

        fs.setDepartureTime(req.getDepartureTime());
        fs.setArrivalTime(req.getArrivalTime());
        fs.setStatus(req.getStatus());

        return scheduleRepo.save(fs);
    }

    public void delete(Long id) {
        scheduleRepo.deleteById(id);
    }
}