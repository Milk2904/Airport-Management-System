package com.airportmanagementsystem.airportmanagementsystem.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAccountRequest {
    private Long employeeId;
    private String username;
    private String password;
}
