package com.airportmanagementsystem.airportmanagementsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.airportmanagementsystem.airportmanagementsystem.dto.request.CreateAccountRequest;
import com.airportmanagementsystem.airportmanagementsystem.dto.request.LoginRequest;
import com.airportmanagementsystem.airportmanagementsystem.dto.response.AccountResponse;
import com.airportmanagementsystem.airportmanagementsystem.dto.response.LoginResponse;
import com.airportmanagementsystem.airportmanagementsystem.entity.Account;
import com.airportmanagementsystem.airportmanagementsystem.entity.Employee;
import com.airportmanagementsystem.airportmanagementsystem.repository.AccountRepository;
import com.airportmanagementsystem.airportmanagementsystem.repository.EmployeeRepository;
import com.airportmanagementsystem.airportmanagementsystem.util.JwtUtil;

@Service
public class AccountService {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private JwtUtil jwtUtil;

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

    public LoginResponse login(LoginRequest req) {
        Account account = accountRepository.findByUsername(req.getUsername())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (!account.getStatus().equals("ACTIVE")) {
            throw new RuntimeException("Account is not active");
        }

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        if (!passwordEncoder.matches(req.getPassword(), account.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(
                account.getUsername(),
                account.getEmployee().getEmployeeId(),
                account.getEmployee().getRole() != null ? account.getEmployee().getRole().getRoleName() : "USER");

        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setUsername(account.getUsername());
        response.setRole(
                account.getEmployee().getRole() != null ? account.getEmployee().getRole().getRoleName() : "USER");
        response.setEmployeeId(account.getEmployee().getEmployeeId());
        response.setEmployeeName(account.getEmployee().getName());

        return response;
    }
}
