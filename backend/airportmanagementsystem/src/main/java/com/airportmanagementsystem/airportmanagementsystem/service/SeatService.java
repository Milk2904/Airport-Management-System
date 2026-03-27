package com.airportmanagementsystem.airportmanagementsystem.service;

import com.airportmanagementsystem.airportmanagementsystem.dto.request.CreateSeatRequest;
import com.airportmanagementsystem.airportmanagementsystem.dto.response.SeatResponse;
import com.airportmanagementsystem.airportmanagementsystem.entity.Aircraft;
import com.airportmanagementsystem.airportmanagementsystem.entity.Seat;
import com.airportmanagementsystem.airportmanagementsystem.repository.AircraftRepository;
import com.airportmanagementsystem.airportmanagementsystem.repository.SeatRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatService {

    private final SeatRepository seatRepository;
    private final AircraftRepository aircraftRepository;

    public SeatService(SeatRepository seatRepository, AircraftRepository aircraftRepository) {
        this.seatRepository = seatRepository;
        this.aircraftRepository = aircraftRepository;
    }

    public SeatResponse create(CreateSeatRequest request) {

        Aircraft aircraft = aircraftRepository.findById(request.getAircraftId())
                .orElseThrow(() -> new RuntimeException("Aircraft not found"));

        Seat seat = new Seat();
        seat.setAircraft(aircraft);
        seat.setSeatNumber(request.getSeatNumber());
        seat.setSeatClass(request.getSeatClass());
        seat.setStatus(request.getStatus());

        seatRepository.save(seat);

        return toResponse(seat);
    }

    public SeatResponse getById(Long id) {
        Seat seat = seatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seat not found"));
        return toResponse(seat);
    }

    public List<Seat> getAll() {
        return seatRepository.findAll();
    }

    public SeatResponse update(Long id, CreateSeatRequest request) {
        Seat seat = seatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seat not found"));

        Aircraft aircraft = aircraftRepository.findById(request.getAircraftId())
                .orElseThrow(() -> new RuntimeException("Aircraft not found"));

        seat.setAircraft(aircraft);
        seat.setSeatNumber(request.getSeatNumber());
        seat.setSeatClass(request.getSeatClass());
        seat.setStatus(request.getStatus());

        seatRepository.save(seat);

        return toResponse(seat);
    }

    public void delete(Long id) {
        seatRepository.deleteById(id);
    }

    private SeatResponse toResponse(Seat seat) {
        SeatResponse res = new SeatResponse();
        res.setSeatId(seat.getSeatId());
        res.setSeatNumber(seat.getSeatNumber());
        res.setSeatClass(seat.getSeatClass());
        res.setStatus(seat.getStatus());
        res.setAircraftId(seat.getAircraft().getAircraftId());
        return res;
    }
}