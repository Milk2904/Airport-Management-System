package com.airportmanagementsystem.airportmanagementsystem.repository;

import com.airportmanagementsystem.airportmanagementsystem.entity.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface passengerRepository extends JpaRepository<Passenger, Long> {

    // tìm theo email
    List<Passenger> findByEmail(String email);

    // tìm theo tên
    List<Passenger> findByFullNameContaining(String name);

}