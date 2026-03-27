package com.airportmanagementsystem.airportmanagementsystem.service;

import com.airportmanagementsystem.airportmanagementsystem.dto.request.FlightScheduleCrewRequest;
import com.airportmanagementsystem.airportmanagementsystem.entity.*;
import com.airportmanagementsystem.airportmanagementsystem.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightScheduleCrewService {

    private final FlightScheduleCrewRepository repo;
    private final FlightScheduleRepository scheduleRepo;
    private final CrewRepository crewRepo;

    public FlightScheduleCrewService(
            FlightScheduleCrewRepository repo,
            FlightScheduleRepository scheduleRepo,
            CrewRepository crewRepo) {
        this.repo = repo;
        this.scheduleRepo = scheduleRepo;
        this.crewRepo = crewRepo;
    }

    public List<FlightScheduleCrew> getAll() {
        return repo.findAll();
    }

    public FlightScheduleCrew create(FlightScheduleCrewRequest req) {
        FlightScheduleCrew fsc = new FlightScheduleCrew();

        fsc.setSchedule(scheduleRepo.findById(req.getScheduleId())
                .orElseThrow(() -> new RuntimeException("Schedule not found")));

        fsc.setCrew(crewRepo.findById(req.getCrewId())
                .orElseThrow(() -> new RuntimeException("Crew not found")));

        return repo.save(fsc);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}