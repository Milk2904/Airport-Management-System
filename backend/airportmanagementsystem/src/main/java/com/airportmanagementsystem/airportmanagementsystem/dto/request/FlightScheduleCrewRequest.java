package com.airportmanagementsystem.airportmanagementsystem.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FlightScheduleCrewRequest {
    private Long scheduleId;
    private Long crewId;
}