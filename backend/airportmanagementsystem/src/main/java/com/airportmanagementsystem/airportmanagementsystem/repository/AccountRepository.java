package com.airportmanagementsystem.airportmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.airportmanagementsystem.airportmanagementsystem.entity.Account;
import com.airportmanagementsystem.airportmanagementsystem.entity.Employee;

public interface AccountRepository extends JpaRepository<Account, Long> {
    boolean existsByUsername(String username);

    boolean existsByEmployee(Employee employee);

    Account findByUsername(String username);
}
