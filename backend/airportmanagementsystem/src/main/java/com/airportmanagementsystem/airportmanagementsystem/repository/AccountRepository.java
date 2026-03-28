package com.airportmanagementsystem.airportmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.airportmanagementsystem.airportmanagementsystem.entity.Account;
import com.airportmanagementsystem.airportmanagementsystem.entity.Employee;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    boolean existsByUsername(String username);

    boolean existsByEmployee(Employee employee);

    Optional<Account> findByUsername(String username);
}
