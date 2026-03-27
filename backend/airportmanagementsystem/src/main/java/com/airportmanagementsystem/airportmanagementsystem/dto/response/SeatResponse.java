package com.airportmanagementsystem.airportmanagementsystem.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeatResponse {
    private Long seatId;
    private String seatNumber;
    private String seatClass;
    private String status;
    private Long aircraftId;
}