package com.airportmanagementsystem.airportmanagementsystem.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.airportmanagementsystem.airportmanagementsystem.entity.Aircraft;
import com.airportmanagementsystem.airportmanagementsystem.repository.AircraftRepository;

@Service
public class AircraftService {

    @Autowired
    private AircraftRepository aircraftRepository;

    public Aircraft create(Aircraft aircraft) {
        return aircraftRepository.save(aircraft);
    }

    public List<Aircraft> getAll() {
        return aircraftRepository.findAll();
    }

    public Aircraft getById(Long id) {
        return aircraftRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aircraft not found"));
    }

    public Aircraft update(Long id, Aircraft data) {
        Aircraft aircraft = getById(id);

        if (data.getAirline() != null)
            aircraft.setAirline(data.getAirline());
        if (data.getModel() != null)
            aircraft.setModel(data.getModel());
        if (data.getCapacity() != null)
            aircraft.setCapacity(data.getCapacity());
        if (data.getManufactureYear() != null)
            aircraft.setManufactureYear(data.getManufactureYear());
        if (data.getStatus() != null)
            aircraft.setStatus(data.getStatus());

        return aircraftRepository.save(aircraft);
    }

    public void delete(Long id) {
        aircraftRepository.deleteById(id);
    }
}
