package com.airportmanagementsystem.airportmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.airportmanagementsystem.airportmanagementsystem.entity.FlightSchedule;

public interface flightScheduleService extends JpaRepository <FlightSchedule,Long> {

    

}
