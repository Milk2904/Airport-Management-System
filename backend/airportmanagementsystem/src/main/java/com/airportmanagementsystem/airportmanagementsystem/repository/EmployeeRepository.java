package com.airportmanagementsystem.airportmanagementsystem.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.airportmanagementsystem.airportmanagementsystem.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmployeeId(Long employeeId);
}