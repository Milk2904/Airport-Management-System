package com.airportmanagementsystem.airportmanagementsystem.service;

import com.airportmanagementsystem.airportmanagementsystem.entity.Crew;
import com.airportmanagementsystem.airportmanagementsystem.repository.CrewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CrewService {

    private final CrewRepository repo;

    public CrewService(CrewRepository repo) {
        this.repo = repo;
    }

    public List<Crew> getAll() {
        return repo.findAll();
    }

    public Crew getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Crew not found"));
    }

    public Crew create(Crew crew) {
        return repo.save(crew);
    }

    public Crew update(Long id, Crew crew) {
        Crew c = getById(id);
        c.setName(crew.getName());
        c.setRole(crew.getRole());
        c.setExperienceYears(crew.getExperienceYears());
        return repo.save(c);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}