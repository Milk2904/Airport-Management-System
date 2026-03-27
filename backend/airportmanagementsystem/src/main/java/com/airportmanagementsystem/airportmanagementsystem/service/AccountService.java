package com.airportmanagementsystem.airportmanagementsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.airportmanagementsystem.airportmanagementsystem.dto.request.CreateAccountRequest;
import com.airportmanagementsystem.airportmanagementsystem.dto.response.AccountResponse;
import com.airportmanagementsystem.airportmanagementsystem.entity.Account;
import com.airportmanagementsystem.airportmanagementsystem.entity.Employee;
import com.airportmanagementsystem.airportmanagementsystem.repository.AccountRepository;
import com.airportmanagementsystem.airportmanagementsystem.repository.EmployeeRepository;

@Service
public class AccountService {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private AccountRepository accountRepository;

    public AccountResponse createAccount(CreateAccountRequest req) {

        Employee employee = employeeRepository.findById(req.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        if (accountRepository.existsByUsername(req.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (accountRepository.existsByEmployee(employee)) {
            throw new RuntimeException("Employee already has an account");
        }
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        Account account = new Account();
        account.setEmployee(employee);
        account.setUsername(req.getUsername());
        account.setPasswordHash(passwordEncoder.encode(req.getPassword())); // <-- hash
        account.setStatus("ACTIVE");

        accountRepository.save(account);

        return new AccountResponse(account);
    }
}
