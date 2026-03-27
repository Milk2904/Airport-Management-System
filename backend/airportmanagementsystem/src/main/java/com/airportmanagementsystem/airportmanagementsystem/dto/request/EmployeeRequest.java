package com.airportmanagementsystem.airportmanagementsystem.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeRequest {

    private String name;
    private String email;
    private String phone;

    private Long airportId;
    private Long roleId;

    private String status;
}