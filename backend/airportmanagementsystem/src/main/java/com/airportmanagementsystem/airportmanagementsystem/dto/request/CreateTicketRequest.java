package com.airportmanagementsystem.airportmanagementsystem.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTicketRequest {

    private Long passengerId;
    private Long scheduleId;
    private Long seatId;
    private Long employeeId;

    private Double price;
    private String status;
}
