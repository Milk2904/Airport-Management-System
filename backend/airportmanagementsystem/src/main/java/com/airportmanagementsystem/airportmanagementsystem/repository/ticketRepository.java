package com.airportmanagementsystem.airportmanagementsystem.repository;

import com.airportmanagementsystem.airportmanagementsystem.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ticketRepository extends JpaRepository<Ticket, Long> {

    // 🔍 Lấy tất cả vé theo passenger
    List<Ticket> findByPassenger_PassengerId(Long passengerId);

    // 🔍 Lấy vé theo schedule
    List<Ticket> findBySchedule_ScheduleId(Long scheduleId);

    // 🔍 Lấy vé theo seat
    List<Ticket> findBySeat_SeatId(Long seatId);

    // 🔍 Lấy vé theo status
    List<Ticket> findByStatus(String status);

    // 🔍 Check ghế đã được đặt chưa
    boolean existsBySchedule_ScheduleIdAndSeat_SeatId(Long scheduleId, Long seatId);

}