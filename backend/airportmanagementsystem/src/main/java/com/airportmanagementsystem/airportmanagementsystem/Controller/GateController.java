package com.airportmanagementsystem.airportmanagementsystem.Controller;

import com.airportmanagementsystem.airportmanagementsystem.entity.Gate;
import com.airportmanagementsystem.airportmanagementsystem.service.GateService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gates")
public class GateController {

    private final GateService gateService;

    public GateController(GateService gateService) {
        this.gateService = gateService;
    }

    @GetMapping
    public List<Gate> getAll() {
        return gateService.getAll();
    }

    @GetMapping("/{id}")
    public Gate getById(@PathVariable Long id) {
        return gateService.getById(id);
    }

    @PostMapping
    public Gate create(@RequestBody Gate gate) {
        return gateService.create(gate);
    }

    @PutMapping("/{id}")
    public Gate update(@PathVariable Long id, @RequestBody Gate gate) {
        return gateService.update(id, gate);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        gateService.delete(id);
    }
}