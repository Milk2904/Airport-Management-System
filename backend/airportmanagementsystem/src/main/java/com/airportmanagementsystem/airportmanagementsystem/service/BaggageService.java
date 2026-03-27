package com.airportmanagementsystem.airportmanagementsystem.service;

import com.airportmanagementsystem.airportmanagementsystem.entity.Baggage;
import com.airportmanagementsystem.airportmanagementsystem.entity.Ticket;
import com.airportmanagementsystem.airportmanagementsystem.repository.BaggageRepository;
import com.airportmanagementsystem.airportmanagementsystem.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BaggageService {

    private final BaggageRepository baggageRepository;
    private final TicketRepository ticketRepository;

    public BaggageService(BaggageRepository baggageRepository, TicketRepository ticketRepository) {
        this.baggageRepository = baggageRepository;
        this.ticketRepository = ticketRepository;
    }

    public List<Baggage> getAll() {
        return baggageRepository.findAll();
    }

    public Baggage getById(Long id) {
        return baggageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Baggage not found"));
    }

    public Baggage create(Baggage baggage) {

        // validate ticket existed
        Ticket ticket = ticketRepository.findById(baggage.getTicket().getTicketId())
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        baggage.setTicket(ticket);

        return baggageRepository.save(baggage);
    }

    public Baggage update(Long id, Baggage data) {
        Baggage baggage = getById(id);

        if (data.getTicket() != null) {
            Ticket ticket = ticketRepository.findById(data.getTicket().getTicketId())
                    .orElseThrow(() -> new RuntimeException("Ticket not found"));
            baggage.setTicket(ticket);
        }

        baggage.setWeight(data.getWeight());
        baggage.setType(data.getType());
        baggage.setStatus(data.getStatus());

        return baggageRepository.save(baggage);
    }

    public void delete(Long id) {
        baggageRepository.deleteById(id);
    }
}