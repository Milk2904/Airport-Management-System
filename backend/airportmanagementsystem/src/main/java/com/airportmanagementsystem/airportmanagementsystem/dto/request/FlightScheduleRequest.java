package com.airportmanagementsystem.airportmanagementsystem.dto.request;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class FlightScheduleRequest {
    private Long flightId;
    private Long aircraftId;
    private Long gateId;

    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;

    private String status;
}