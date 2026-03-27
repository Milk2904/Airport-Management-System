package com.airportmanagementsystem.airportmanagementsystem.dto.response;

import com.airportmanagementsystem.airportmanagementsystem.entity.Account;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountResponse {
    private Long id;
    private String username;
    private String status;
    private Long employeeId;

    public AccountResponse(Account account) {
        this.id = account.getAccountId();
        this.username = account.getUsername();
        this.status = account.getStatus();
        this.employeeId = account.getEmployee().getEmployeeId();
    }
}
