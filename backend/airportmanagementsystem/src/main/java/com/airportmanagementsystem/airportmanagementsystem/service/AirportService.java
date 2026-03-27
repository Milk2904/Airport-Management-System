package com.airportmanagementsystem.airportmanagementsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.airportmanagementsystem.airportmanagementsystem.entity.Airport;
import com.airportmanagementsystem.airportmanagementsystem.repository.AirportRepository;

@Service
public class AirportService {

    @Autowired
    private AirportRepository airportRepository;

    public Airport create(Airport airport) {
        return airportRepository.save(airport);
    }

    public List<Airport> getAll() {
        return airportRepository.findAll();
    }

    public Airport getById(Long id) {
        return airportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Airport not found"));
    }

    public Airport update(Long id, Airport data) {
        Airport airport = getById(id);
        airport.setCode(data.getCode());
        airport.setName(data.getName());
        airport.setCity(data.getCity());
        airport.setCountry(data.getCountry());
        return airportRepository.save(airport);
    }

    public void delete(Long id) {
        airportRepository.deleteById(id);
    }
}
