package com.airportmanagementsystem.airportmanagementsystem.service;

import com.airportmanagementsystem.airportmanagementsystem.entity.*;
import com.airportmanagementsystem.airportmanagementsystem.repository.*;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FlightService {

    private final FlightRepository flightRepository;
    private final AirportRepository airportRepository;
    private final AirlineRepository airlineRepository;

    public FlightService(
            FlightRepository flightRepository,
            AirportRepository airportRepository,
            AirlineRepository airlineRepository) {
        this.flightRepository = flightRepository;
        this.airportRepository = airportRepository;
        this.airlineRepository = airlineRepository;
    }

    public List<Flight> getAll() {
        return flightRepository.findAll();
    }

    public Flight getById(Long id) {
        return flightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flight not found"));
    }

    public Flight create(Flight flight, Long departureId, Long arrivalId, Long airlineId) {
        Airport departure = airportRepository.findById(departureId)
                .orElseThrow(() -> new RuntimeException("Departure airport not found"));

        Airport arrival = airportRepository.findById(arrivalId)
                .orElseThrow(() -> new RuntimeException("Arrival airport not found"));

        Airline airline = airlineRepository.findById(airlineId)
                .orElseThrow(() -> new RuntimeException("Airline not found"));

        flight.setDepartureAirport(departure);
        flight.setArrivalAirport(arrival);
        flight.setAirline(airline);

        return flightRepository.save(flight);
    }

    public Flight update(Long id, Flight data) {
        Flight flight = getById(id);

        if (data.getFlightNumber() != null)
            flight.setFlightNumber(data.getFlightNumber());
        if (data.getDuration() != null)
            flight.setDuration(data.getDuration());

        return flightRepository.save(flight);
    }

    public void delete(Long id) {
        flightRepository.deleteById(id);
    }
}