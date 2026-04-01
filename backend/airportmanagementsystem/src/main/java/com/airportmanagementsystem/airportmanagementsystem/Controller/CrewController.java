package com.airportmanagementsystem.airportmanagementsystem.Controller;


import com.airportmanagementsystem.airportmanagementsystem.entity.Crew;
import com.airportmanagementsystem.airportmanagementsystem.service.CrewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/crew")
public class CrewController {

    private final CrewService service;

    public CrewController(CrewService service) {
        this.service = service;
    }

    @GetMapping
    public List<Crew> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Crew getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Crew create(@RequestBody Crew crew) {
        return service.create(crew);
    }

    @PutMapping("/{id}")
    public Crew update(@PathVariable Long id, @RequestBody Crew crew) {
        return service.update(id, crew);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
