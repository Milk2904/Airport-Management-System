package com.airportmanagementsystem.airportmanagementsystem.service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.airportmanagementsystem.airportmanagementsystem.entity.FlightSchedule;

public interface FlightScheduleService extends JpaRepository <FlightSchedule,Long> {

    

}
