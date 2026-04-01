package com.airportmanagementsystem.airportmanagementsystem.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.airportmanagementsystem.airportmanagementsystem.dto.request.CreateAccountRequest;
import com.airportmanagementsystem.airportmanagementsystem.dto.request.LoginRequest;
import com.airportmanagementsystem.airportmanagementsystem.dto.response.AccountResponse;
import com.airportmanagementsystem.airportmanagementsystem.dto.response.ApiResponse;
import com.airportmanagementsystem.airportmanagementsystem.dto.response.LoginResponse;
import com.airportmanagementsystem.airportmanagementsystem.service.AccountService;

@RestController
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @PostMapping
    public ApiResponse<AccountResponse> create(@RequestBody CreateAccountRequest request) {
        ApiResponse<AccountResponse> response = new ApiResponse<>();
        AccountResponse result = accountService.createAccount(request);
        response.setResult(result);
        return response;
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody LoginRequest request) {
        ApiResponse<LoginResponse> response = new ApiResponse<>();
        LoginResponse result = accountService.login(request);
        response.setResult(result);
        return response;
    }
}
