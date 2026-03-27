package com.airportmanagementsystem.airportmanagementsystem.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateSeatRequest {
    private String seatNumber;
    private String seatClass;
    private String status;
    private Long aircraftId;
}