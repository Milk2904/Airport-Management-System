package com.airportmanagementsystem.airportmanagementsystem.service;

import com.airportmanagementsystem.airportmanagementsystem.dto.request.EmployeeRequest;
import com.airportmanagementsystem.airportmanagementsystem.entity.*;
import com.airportmanagementsystem.airportmanagementsystem.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final AirportRepository airportRepository;
    private final RoleRepository roleRepository;

    public EmployeeService(
            EmployeeRepository employeeRepository,
            AirportRepository airportRepository,
            RoleRepository roleRepository) {
        this.employeeRepository = employeeRepository;
        this.airportRepository = airportRepository;
        this.roleRepository = roleRepository;
    }

    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    public Employee getById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    public Employee create(EmployeeRequest req) {
        Employee emp = new Employee();

        emp.setName(req.getName());
        emp.setEmail(req.getEmail());
        emp.setPhone(req.getPhone());
        emp.setStatus(req.getStatus());

        emp.setAirport(airportRepository.findById(req.getAirportId())
                .orElseThrow(() -> new RuntimeException("Airport not found")));

        emp.setRole(roleRepository.findById(req.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found")));

        return employeeRepository.save(emp);
    }

    public Employee update(Long id, EmployeeRequest req) {
        Employee emp = getById(id);

        emp.setName(req.getName());
        emp.setEmail(req.getEmail());
        emp.setPhone(req.getPhone());
        emp.setStatus(req.getStatus());

        emp.setAirport(airportRepository.findById(req.getAirportId())
                .orElseThrow(() -> new RuntimeException("Airport not found")));

        emp.setRole(roleRepository.findById(req.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found")));

        return employeeRepository.save(emp);
    }

    public void delete(Long id) {
        employeeRepository.deleteById(id);
    }
}