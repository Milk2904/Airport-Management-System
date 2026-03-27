package com.airportmanagementsystem.airportmanagementsystem.service;

import com.airportmanagementsystem.airportmanagementsystem.entity.Airport;
import com.airportmanagementsystem.airportmanagementsystem.entity.Gate;
import com.airportmanagementsystem.airportmanagementsystem.repository.AirportRepository;
import com.airportmanagementsystem.airportmanagementsystem.repository.GateRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GateService {

    private final GateRepository gateRepository;
    private final AirportRepository airportRepository;

    public GateService(GateRepository gateRepository, AirportRepository airportRepository) {
        this.gateRepository = gateRepository;
        this.airportRepository = airportRepository;
    }

    public List<Gate> getAll() {
        return gateRepository.findAll();
    }

    public Gate getById(Long id) {
        return gateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Gate not found"));
    }

    public Gate create(Gate gate) {

        Airport airport = airportRepository.findById(gate.getAirport().getAirportId())
                .orElseThrow(() -> new RuntimeException("Airport not found"));

        gate.setAirport(airport);

        return gateRepository.save(gate);
    }

    public Gate update(Long id, Gate data) {
        Gate gate = getById(id);

        if (data.getAirport() != null) {
            Airport airport = airportRepository.findById(data.getAirport().getAirportId())
                    .orElseThrow(() -> new RuntimeException("Airport not found"));
            gate.setAirport(airport);
        }

        gate.setGateCode(data.getGateCode());
        gate.setTerminal(data.getTerminal());
        gate.setStatus(data.getStatus());

        return gateRepository.save(gate);
    }

    public void delete(Long id) {
        gateRepository.deleteById(id);
    }
}