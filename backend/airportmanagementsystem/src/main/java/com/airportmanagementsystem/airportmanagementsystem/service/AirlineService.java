package com.airportmanagementsystem.airportmanagementsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.airportmanagementsystem.airportmanagementsystem.entity.Airline;
import com.airportmanagementsystem.airportmanagementsystem.repository.AirlineRepository;

@Service
public class AirlineService {

    @Autowired
    private AirlineRepository airlineRepository;

    public Airline create(Airline airline) {
        return airlineRepository.save(airline);
    }

    public List<Airline> getAll() {
        return airlineRepository.findAll();
    }

    public Airline getById(Long id) {
        return airlineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Airline not found"));
    }

    public Airline update(Long id, Airline data) {
        Airline airline = getById(id);
        airline.setAirlineName(data.getAirlineName());
        airline.setCountry(data.getCountry());
        return airlineRepository.save(airline);
    }

    public void delete(Long id) {
        airlineRepository.deleteById(id);
    }
}
