package com.airportmanagementsystem.airportmanagementsystem.service;

import com.airportmanagementsystem.airportmanagementsystem.entity.Passenger;
import com.airportmanagementsystem.airportmanagementsystem.repository.PassengerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PassengerService {

    private final PassengerRepository passengerRepository;

    public PassengerService(PassengerRepository passengerRepository) {
        this.passengerRepository = passengerRepository;
    }

    public List<Passenger> getAll() {
        return passengerRepository.findAll();
    }

    public Passenger getById(Long id) {
        return passengerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Passenger not found"));
    }

    public Passenger create(Passenger passenger) {
        return passengerRepository.save(passenger);
    }

    public Passenger update(Long id, Passenger data) {
        Passenger passenger = getById(id);

        passenger.setFullName(data.getFullName());
        passenger.setEmail(data.getEmail());
        passenger.setPhone(data.getPhone());
        passenger.setPassportNumber(data.getPassportNumber());

        return passengerRepository.save(passenger);
    }

    public void delete(Long id) {
        passengerRepository.deleteById(id);
    }
}