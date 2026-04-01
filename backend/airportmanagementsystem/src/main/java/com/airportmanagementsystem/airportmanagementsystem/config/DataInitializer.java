package com.airportmanagementsystem.airportmanagementsystem.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.airportmanagementsystem.airportmanagementsystem.entity.*;
import com.airportmanagementsystem.airportmanagementsystem.repository.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired private RoleRepository roleRepository;
    @Autowired private AirportRepository airportRepository;
    @Autowired private AirlineRepository airlineRepository;
    @Autowired private AircraftRepository aircraftRepository;
    @Autowired private GateRepository gateRepository;
    @Autowired private SeatRepository seatRepository;
    @Autowired private PassengerRepository passengerRepository;
    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private AccountRepository accountRepository;
    @Autowired private FlightRepository flightRepository;
    @Autowired private FlightScheduleRepository flightScheduleRepository;
    @Autowired private TicketRepository ticketRepository;
    @Autowired private CrewRepository crewRepository;
    @Autowired private FlightScheduleCrewRepository flightScheduleCrewRepository;
    @Autowired private BaggageRepository baggageRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        System.out.println("Checking data status...");

        // =====================================================================
        // 1. ROLES
        // =====================================================================
        if (roleRepository.count() == 0) {
            System.out.println("Initializing Roles...");
            Role adminRole = new Role(); adminRole.setRoleName("ADMIN"); adminRole.setDescription("System administrator with full access");
            Role managerRole = new Role(); managerRole.setRoleName("MANAGER"); managerRole.setDescription("Airport operations manager");
            Role staffRole = new Role(); staffRole.setRoleName("STAFF"); staffRole.setDescription("Ground staff member");
            roleRepository.saveAll(List.of(adminRole, managerRole, staffRole));
        }

        Role adminRole = roleRepository.findByRoleName("ADMIN");
        Role managerRole = roleRepository.findByRoleName("MANAGER");
        if (managerRole == null) managerRole = adminRole;
        Role staffRole = roleRepository.findByRoleName("STAFF");
        if (staffRole == null) staffRole = adminRole;

        // =====================================================================
        // 2. AIRPORTS
        // =====================================================================
        if (airportRepository.count() == 0) {
            System.out.println("Initializing Airports...");
            Airport han = new Airport(); han.setCode("HAN"); han.setName("Noi Bai International Airport"); han.setCity("Ha Noi"); han.setCountry("Vietnam");
            Airport sgn = new Airport(); sgn.setCode("SGN"); sgn.setName("Tan Son Nhat International Airport"); sgn.setCity("Ho Chi Minh City"); sgn.setCountry("Vietnam");
            Airport dad = new Airport(); dad.setCode("DAD"); dad.setName("Da Nang International Airport"); dad.setCity("Da Nang"); dad.setCountry("Vietnam");
            Airport phu = new Airport(); phu.setCode("PQC"); phu.setName("Phu Quoc International Airport"); phu.setCity("Phu Quoc"); phu.setCountry("Vietnam");
            Airport bkk = new Airport(); bkk.setCode("BKK"); bkk.setName("Suvarnabhumi Airport"); bkk.setCity("Bangkok"); bkk.setCountry("Thailand");
            Airport sin = new Airport(); sin.setCode("SIN"); sin.setName("Changi Airport"); sin.setCity("Singapore"); sin.setCountry("Singapore");
            airportRepository.saveAll(List.of(han, sgn, dad, phu, bkk, sin));
        }

        Airport han = airportRepository.findByCode("HAN").orElse(null);
        Airport sgn = airportRepository.findByCode("SGN").orElse(null);
        Airport dad = airportRepository.findByCode("DAD").orElse(null);
        Airport phu = airportRepository.findByCode("PQC").orElse(null);
        Airport bkk = airportRepository.findByCode("BKK").orElse(null);

        // =====================================================================
        // 3. AIRLINES
        // =====================================================================
        if (airlineRepository.count() == 0) {
            System.out.println("Initializing Airlines...");
            Airline vna = new Airline(); vna.setAirlineName("Vietnam Airlines"); vna.setCountry("Vietnam");
            Airline vja = new Airline(); vja.setAirlineName("Vietjet Air"); vja.setCountry("Vietnam");
            Airline bam = new Airline(); bam.setAirlineName("Bamboo Airways"); bam.setCountry("Vietnam");
            Airline tha = new Airline(); tha.setAirlineName("Thai Airways"); tha.setCountry("Thailand");
            airlineRepository.saveAll(List.of(vna, vja, bam, tha));
        }

        List<Airline> airlines = airlineRepository.findAll();
        Airline vna = airlines.get(0);
        Airline vja = airlines.size() > 1 ? airlines.get(1) : vna;
        Airline bam = airlines.size() > 2 ? airlines.get(2) : vna;
        Airline tha = airlines.size() > 3 ? airlines.get(3) : vna;

        // =====================================================================
        // 4. AIRCRAFT
        // =====================================================================
        if (aircraftRepository.count() == 0) {
            System.out.println("Initializing Aircrafts...");
            Aircraft ac1 = new Aircraft(); ac1.setModel("Airbus A350-900"); ac1.setCapacity(306); ac1.setAirline(vna); ac1.setStatus("ACTIVE"); ac1.setManufactureYear(2022);
            Aircraft ac2 = new Aircraft(); ac2.setModel("Boeing 787-9 Dreamliner"); ac2.setCapacity(274); ac2.setAirline(vna); ac2.setStatus("ACTIVE"); ac2.setManufactureYear(2021);
            Aircraft ac3 = new Aircraft(); ac3.setModel("Airbus A321neo"); ac3.setCapacity(200); ac3.setAirline(vja); ac3.setStatus("ACTIVE"); ac3.setManufactureYear(2023);
            Aircraft ac4 = new Aircraft(); ac4.setModel("Airbus A320"); ac4.setCapacity(180); ac4.setAirline(vja); ac4.setStatus("ACTIVE"); ac4.setManufactureYear(2020);
            Aircraft ac5 = new Aircraft(); ac5.setModel("Embraer E195"); ac5.setCapacity(132); ac5.setAirline(bam); ac5.setStatus("ACTIVE"); ac5.setManufactureYear(2022);
            Aircraft ac6 = new Aircraft(); ac6.setModel("Boeing 777-300ER"); ac6.setCapacity(396); ac6.setAirline(tha); ac6.setStatus("MAINTENANCE"); ac6.setManufactureYear(2019);
            aircraftRepository.saveAll(List.of(ac1, ac2, ac3, ac4, ac5, ac6));
        }

        List<Aircraft> allAircrafts = aircraftRepository.findAll();
        Aircraft ac1 = allAircrafts.get(0);
        Aircraft ac2 = allAircrafts.size() > 1 ? allAircrafts.get(1) : ac1;
        Aircraft ac3 = allAircrafts.size() > 2 ? allAircrafts.get(2) : ac1;
        Aircraft ac4 = allAircrafts.size() > 3 ? allAircrafts.get(3) : ac1;

        // =====================================================================
        // 5. GATES
        // =====================================================================
        if (gateRepository.count() == 0 && han != null && sgn != null) {
            System.out.println("Initializing Gates...");
            // HAN gates
            Gate gh1 = new Gate(); gh1.setGateCode("H1"); gh1.setTerminal("T1"); gh1.setStatus("OPEN"); gh1.setAirport(han);
            Gate gh2 = new Gate(); gh2.setGateCode("H2"); gh2.setTerminal("T1"); gh2.setStatus("OPEN"); gh2.setAirport(han);
            Gate gh3 = new Gate(); gh3.setGateCode("H3"); gh3.setTerminal("T2"); gh3.setStatus("OPEN"); gh3.setAirport(han);
            Gate gh4 = new Gate(); gh4.setGateCode("H4"); gh4.setTerminal("T2"); gh4.setStatus("CLOSED"); gh4.setAirport(han);
            // SGN gates
            Gate gs1 = new Gate(); gs1.setGateCode("S1"); gs1.setTerminal("T1"); gs1.setStatus("OPEN"); gs1.setAirport(sgn);
            Gate gs2 = new Gate(); gs2.setGateCode("S2"); gs2.setTerminal("T1"); gs2.setStatus("OPEN"); gs2.setAirport(sgn);
            Gate gs3 = new Gate(); gs3.setGateCode("S3"); gs3.setTerminal("T2"); gs3.setStatus("OPEN"); gs3.setAirport(sgn);
            // DAD gates
            Gate gd1 = null;
            if (dad != null) {
                gd1 = new Gate(); gd1.setGateCode("D1"); gd1.setTerminal("T1"); gd1.setStatus("OPEN"); gd1.setAirport(dad);
                Gate gd2 = new Gate(); gd2.setGateCode("D2"); gd2.setTerminal("T1"); gd2.setStatus("OPEN"); gd2.setAirport(dad);
                gateRepository.saveAll(List.of(gh1, gh2, gh3, gh4, gs1, gs2, gs3, gd1, gd2));
            } else {
                gateRepository.saveAll(List.of(gh1, gh2, gh3, gh4, gs1, gs2, gs3));
            }
        }

        List<Gate> allGates = gateRepository.findAll();

        // =====================================================================
        // 6. SEATS
        // =====================================================================
        if (seatRepository.count() == 0) {
            System.out.println("Initializing Seats...");
            List<Seat> seats = new ArrayList<>();
            for (Aircraft ac : allAircrafts) {
                // Business class: rows 1-4, 2 cols (A,C)
                for (int row = 1; row <= 4; row++) {
                    for (String col : new String[]{"A", "C"}) {
                        Seat s = new Seat();
                        s.setAircraft(ac);
                        s.setSeatNumber(row + col);
                        s.setSeatClass("BUSINESS");
                        s.setStatus("AVAILABLE");
                        seats.add(s);
                    }
                }
                // Economy class: rows 5-20, 6 cols
                for (int row = 5; row <= 20; row++) {
                    for (String col : new String[]{"A", "B", "C", "D", "E", "F"}) {
                        Seat s = new Seat();
                        s.setAircraft(ac);
                        s.setSeatNumber(row + col);
                        s.setSeatClass("ECONOMY");
                        s.setStatus("AVAILABLE");
                        seats.add(s);
                    }
                }
            }
            seatRepository.saveAll(seats);
        }

        // =====================================================================
        // 7. PASSENGERS
        // =====================================================================
        if (passengerRepository.count() == 0) {
            System.out.println("Initializing Passengers...");
            Passenger p1 = new Passenger(); p1.setFullName("Nguyen Van An"); p1.setEmail("vanan@gmail.com"); p1.setPhone("0987654321"); p1.setPassportNumber("B1234567");
            Passenger p2 = new Passenger(); p2.setFullName("Tran Thi Bich"); p2.setEmail("thibich@gmail.com"); p2.setPhone("0123456789"); p2.setPassportNumber("C7654321");
            Passenger p3 = new Passenger(); p3.setFullName("Le Van Cuong"); p3.setEmail("leucuong@gmail.com"); p3.setPhone("0912345678"); p3.setPassportNumber("D9876543");
            Passenger p4 = new Passenger(); p4.setFullName("Pham Thi Dung"); p4.setEmail("thiduong@gmail.com"); p4.setPhone("0905678901"); p4.setPassportNumber("E1357924");
            Passenger p5 = new Passenger(); p5.setFullName("Hoang Minh Duc"); p5.setEmail("minhduc@gmail.com"); p5.setPhone("0931234567"); p5.setPassportNumber("F2468013");
            Passenger p6 = new Passenger(); p6.setFullName("Vu Thi Em"); p6.setEmail("thiem@gmail.com"); p6.setPhone("0965432187"); p6.setPassportNumber("G3579246");
            Passenger p7 = new Passenger(); p7.setFullName("Dang Van Phong"); p7.setEmail("vanphong@gmail.com"); p7.setPhone("0978901234"); p7.setPassportNumber("H1928374");
            Passenger p8 = new Passenger(); p8.setFullName("Bui Thi Giang"); p8.setEmail("thigiang@gmail.com"); p8.setPhone("0943216789"); p8.setPassportNumber("I9081726");
            passengerRepository.saveAll(List.of(p1, p2, p3, p4, p5, p6, p7, p8));
        }

        // =====================================================================
        // 8. EMPLOYEES & ACCOUNTS
        // =====================================================================
        if (accountRepository.count() == 0) {
            System.out.println("Initializing Employees and Accounts...");

            Employee adminEmp = new Employee(); adminEmp.setName("System Admin"); adminEmp.setEmail("admin@airport.vn"); adminEmp.setPhone("0800000001"); adminEmp.setAirport(han); adminEmp.setRole(adminRole); adminEmp.setStatus("ACTIVE");
            Employee managerEmp = new Employee(); managerEmp.setName("Nguyen Thi Mai"); managerEmp.setEmail("mai.nguyen@airport.vn"); managerEmp.setPhone("0800000002"); managerEmp.setAirport(han); managerEmp.setRole(managerRole); managerEmp.setStatus("ACTIVE");
            Employee staff1 = new Employee(); staff1.setName("Tran Van Binh"); staff1.setEmail("binh.tran@airport.vn"); staff1.setPhone("0800000003"); staff1.setAirport(han); staff1.setRole(staffRole); staff1.setStatus("ACTIVE");
            Employee staff2 = new Employee(); staff2.setName("Le Thi Cat"); staff2.setEmail("cat.le@airport.vn"); staff2.setPhone("0800000004"); staff2.setAirport(sgn); staff2.setRole(staffRole); staff2.setStatus("ACTIVE");
            Employee staff3 = new Employee(); staff3.setName("Pham Van Dat"); staff3.setEmail("dat.pham@airport.vn"); staff3.setPhone("0800000005"); staff3.setAirport(sgn); staff3.setRole(staffRole); staff3.setStatus("INACTIVE");
            employeeRepository.saveAll(List.of(adminEmp, managerEmp, staff1, staff2, staff3));

            Account adminAcc = new Account(); adminAcc.setUsername("admin"); adminAcc.setPasswordHash(passwordEncoder.encode("admin123")); adminAcc.setEmployee(adminEmp); adminAcc.setStatus("ACTIVE");
            Account managerAcc = new Account(); managerAcc.setUsername("manager"); managerAcc.setPasswordHash(passwordEncoder.encode("manager123")); managerAcc.setEmployee(managerEmp); managerAcc.setStatus("ACTIVE");
            Account userAcc = new Account(); userAcc.setUsername("user"); userAcc.setPasswordHash(passwordEncoder.encode("user123")); userAcc.setEmployee(staff1); userAcc.setStatus("ACTIVE");
            accountRepository.saveAll(List.of(adminAcc, managerAcc, userAcc));
        }

        List<Employee> allEmployees = employeeRepository.findAll();
        Employee staffEmployee = allEmployees.isEmpty() ? null : allEmployees.get(allEmployees.size() - 1);

        // =====================================================================
        // 9. CREW
        // =====================================================================
        if (crewRepository.count() == 0) {
            System.out.println("Initializing Crew...");
            Crew c1 = new Crew(); c1.setName("Nguyen Phi Hung"); c1.setRole("PILOT"); c1.setExperienceYears(12);
            Crew c2 = new Crew(); c2.setName("Tran Thanh Long"); c2.setRole("PILOT"); c2.setExperienceYears(8);
            Crew c3 = new Crew(); c3.setName("Le Van Kien"); c3.setRole("CO_PILOT"); c3.setExperienceYears(5);
            Crew c4 = new Crew(); c4.setName("Pham Ngoc Anh"); c4.setRole("CO_PILOT"); c4.setExperienceYears(3);
            Crew c5 = new Crew(); c5.setName("Hoang Thi Lan"); c5.setRole("FLIGHT_ATTENDANT"); c5.setExperienceYears(6);
            Crew c6 = new Crew(); c6.setName("Vu Thi Huong"); c6.setRole("FLIGHT_ATTENDANT"); c6.setExperienceYears(4);
            Crew c7 = new Crew(); c7.setName("Dang Minh Tuan"); c7.setRole("FLIGHT_ATTENDANT"); c7.setExperienceYears(7);
            Crew c8 = new Crew(); c8.setName("Bui Quoc Nam"); c8.setRole("FLIGHT_ATTENDANT"); c8.setExperienceYears(2);
            Crew c9 = new Crew(); c9.setName("Do Thi Thanh"); c9.setRole("PURSER"); c9.setExperienceYears(10);
            Crew c10 = new Crew(); c10.setName("Ly Van Truong"); c10.setRole("ENGINEER"); c10.setExperienceYears(15);
            crewRepository.saveAll(List.of(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10));
        }

        List<Crew> allCrew = crewRepository.findAll();

        // =====================================================================
        // 10. FLIGHTS
        // =====================================================================
        if (flightRepository.count() == 0 && han != null && sgn != null) {
            System.out.println("Initializing Flights...");
            Flight f1 = new Flight(); f1.setFlightNumber("VN123"); f1.setDepartureAirport(han); f1.setArrivalAirport(sgn); f1.setAirline(vna); f1.setAircraft(ac1); f1.setDuration(120);
            Flight f2 = new Flight(); f2.setFlightNumber("VN456"); f2.setDepartureAirport(sgn); f2.setArrivalAirport(han); f2.setAirline(vna); f2.setAircraft(ac2); f2.setDuration(110);
            Flight f3 = new Flight(); f3.setFlightNumber("VJ789"); f3.setDepartureAirport(han); f3.setArrivalAirport(sgn); f3.setAirline(vja); f3.setAircraft(ac3); f3.setDuration(130);
            Flight f4 = new Flight();
            if (dad != null) { f4.setFlightNumber("VN234"); f4.setDepartureAirport(han); f4.setArrivalAirport(dad); f4.setAirline(vna); f4.setAircraft(ac2); f4.setDuration(75); }
            Flight f5 = new Flight();
            if (phu != null) { f5.setFlightNumber("VJ321"); f5.setDepartureAirport(sgn); f5.setArrivalAirport(phu); f5.setAirline(vja); f5.setAircraft(ac4); f5.setDuration(60); }
            Flight f6 = new Flight();
            if (bkk != null) { f6.setFlightNumber("VN888"); f6.setDepartureAirport(han); f6.setArrivalAirport(bkk); f6.setAirline(vna); f6.setAircraft(ac1); f6.setDuration(210); }

            List<Flight> toSave = new ArrayList<>(List.of(f1, f2, f3));
            if (dad != null) toSave.add(f4);
            if (phu != null) toSave.add(f5);
            if (bkk != null) toSave.add(f6);
            flightRepository.saveAll(toSave);
        }

        List<Flight> allFlights = flightRepository.findAll();

        // =====================================================================
        // 11. FLIGHT SCHEDULES
        // =====================================================================
        if (flightScheduleRepository.count() == 0 && !allFlights.isEmpty() && !allGates.isEmpty()) {
            System.out.println("Initializing Flight Schedules...");
            LocalDateTime now = LocalDateTime.now();

            List<FlightSchedule> schedules = new ArrayList<>();

            // Schedule 1 – tomorrow morning
            FlightSchedule s1 = new FlightSchedule();
            s1.setFlight(allFlights.get(0));
            s1.setAircraft(ac1);
            s1.setGate(allGates.get(0));
            s1.setDepartureTime(now.plusDays(1).withHour(6).withMinute(0));
            s1.setArrivalTime(now.plusDays(1).withHour(8).withMinute(0));
            s1.setStatus("SCHEDULED");
            schedules.add(s1);

            // Schedule 2 – tomorrow afternoon
            if (allFlights.size() > 1) {
                FlightSchedule s2 = new FlightSchedule();
                s2.setFlight(allFlights.get(1));
                s2.setAircraft(ac2);
                s2.setGate(allGates.size() > 4 ? allGates.get(4) : allGates.get(0));
                s2.setDepartureTime(now.plusDays(1).withHour(14).withMinute(30));
                s2.setArrivalTime(now.plusDays(1).withHour(16).withMinute(20));
                s2.setStatus("SCHEDULED");
                schedules.add(s2);
            }

            // Schedule 3 – day after tomorrow
            if (allFlights.size() > 2) {
                FlightSchedule s3 = new FlightSchedule();
                s3.setFlight(allFlights.get(2));
                s3.setAircraft(ac3);
                s3.setGate(allGates.size() > 1 ? allGates.get(1) : allGates.get(0));
                s3.setDepartureTime(now.plusDays(2).withHour(9).withMinute(0));
                s3.setArrivalTime(now.plusDays(2).withHour(11).withMinute(10));
                s3.setStatus("SCHEDULED");
                schedules.add(s3);
            }

            // Schedule 4 – completed (yesterday)
            FlightSchedule s4 = new FlightSchedule();
            s4.setFlight(allFlights.get(0));
            s4.setAircraft(ac1);
            s4.setGate(allGates.get(0));
            s4.setDepartureTime(now.minusDays(1).withHour(7).withMinute(0));
            s4.setArrivalTime(now.minusDays(1).withHour(9).withMinute(0));
            s4.setStatus("COMPLETED");
            schedules.add(s4);

            // Schedule 5 – in progress (today)
            if (allFlights.size() > 3) {
                FlightSchedule s5 = new FlightSchedule();
                s5.setFlight(allFlights.get(3));
                s5.setAircraft(ac2);
                s5.setGate(allGates.size() > 2 ? allGates.get(2) : allGates.get(0));
                s5.setDepartureTime(now.minusHours(1));
                s5.setArrivalTime(now.plusMinutes(15));
                s5.setStatus("IN_PROGRESS");
                schedules.add(s5);
            }

            // Schedule 6 – delayed
            if (allFlights.size() > 4) {
                FlightSchedule s6 = new FlightSchedule();
                s6.setFlight(allFlights.get(4));
                s6.setAircraft(ac4);
                s6.setGate(allGates.size() > 5 ? allGates.get(5) : allGates.get(0));
                s6.setDepartureTime(now.plusDays(1).withHour(11).withMinute(0));
                s6.setArrivalTime(now.plusDays(1).withHour(12).withMinute(0));
                s6.setStatus("DELAYED");
                schedules.add(s6);
            }

            flightScheduleRepository.saveAll(schedules);
        }

        List<FlightSchedule> allSchedules = flightScheduleRepository.findAll();

        // =====================================================================
        // 12. FLIGHT SCHEDULE CREW
        // =====================================================================
        if (flightScheduleCrewRepository.count() == 0 && !allSchedules.isEmpty() && !allCrew.isEmpty()) {
            System.out.println("Initializing Flight Schedule Crew...");
            List<FlightScheduleCrew> fscList = new ArrayList<>();

            // Assign 4-5 crew members to each schedule
            for (int si = 0; si < allSchedules.size(); si++) {
                FlightSchedule sched = allSchedules.get(si);
                int start = (si * 2) % allCrew.size();
                for (int ci = 0; ci < Math.min(4, allCrew.size()); ci++) {
                    int idx = (start + ci) % allCrew.size();
                    FlightScheduleCrew fsc = new FlightScheduleCrew();
                    fsc.setSchedule(sched);
                    fsc.setCrew(allCrew.get(idx));
                    fscList.add(fsc);
                }
            }
            flightScheduleCrewRepository.saveAll(fscList);
        }

        // =====================================================================
        // 13. TICKETS
        // =====================================================================
        if (ticketRepository.count() == 0 && !allSchedules.isEmpty()) {
            System.out.println("Initializing Tickets...");
            List<Passenger> passengers = passengerRepository.findAll();
            List<Seat> allSeats = seatRepository.findAll();

            if (!passengers.isEmpty() && !allSeats.isEmpty() && staffEmployee != null) {
                List<Ticket> tickets = new ArrayList<>();

                // Create 2 tickets per schedule (first 3 schedules)
                for (int si = 0; si < Math.min(3, allSchedules.size()); si++) {
                    FlightSchedule sched = allSchedules.get(si);

                    // Find seats for the aircraft used in this schedule
                    Aircraft schedAircraft = sched.getAircraft();
                    List<Seat> schedSeats = allSeats.stream()
                        .filter(seat -> seat.getAircraft() != null && seat.getAircraft().getAircraftId().equals(schedAircraft.getAircraftId()))
                        .limit(2)
                        .toList();

                    for (int i = 0; i < schedSeats.size() && i < passengers.size(); i++) {
                        Passenger passenger = passengers.get((si * 2 + i) % passengers.size());
                        Ticket ticket = new Ticket();
                        ticket.setPassenger(passenger);
                        ticket.setSchedule(sched);
                        ticket.setSeat(schedSeats.get(i));
                        ticket.setEmployee(staffEmployee);
                        ticket.setPrice(schedSeats.get(i).getSeatClass().equals("BUSINESS") ? 3500000.0 : 1200000.0);
                        ticket.setStatus(si < 2 ? "CONFIRMED" : "PENDING");
                        ticket.setCreatedAt(LocalDateTime.now().minusDays(si + 1));
                        tickets.add(ticket);
                    }
                }
                ticketRepository.saveAll(tickets);
            }
        }

        // =====================================================================
        // 14. BAGGAGE
        // =====================================================================
        if (baggageRepository.count() == 0 && ticketRepository.count() > 0) {
            System.out.println("Initializing Baggage...");
            List<Ticket> allTickets = ticketRepository.findAll();
            List<Baggage> baggages = new ArrayList<>();

            for (Ticket ticket : allTickets) {
                // Each ticket gets 1-2 baggage items
                Baggage b1 = new Baggage();
                b1.setTicket(ticket);
                b1.setWeight(20.0);
                b1.setType("CHECK_IN");
                b1.setStatus("CHECKED");
                baggages.add(b1);

                if (allTickets.indexOf(ticket) % 2 == 0) {
                    Baggage b2 = new Baggage();
                    b2.setTicket(ticket);
                    b2.setWeight(7.0);
                    b2.setType("CARRY_ON");
                    b2.setStatus("CHECKED");
                    baggages.add(b2);
                }
            }
            baggageRepository.saveAll(baggages);
        }

        System.out.println("========================================");
        System.out.println(" Data initialization complete!");
        System.out.println("  Roles:            " + roleRepository.count());
        System.out.println("  Airports:         " + airportRepository.count());
        System.out.println("  Airlines:         " + airlineRepository.count());
        System.out.println("  Aircraft:         " + aircraftRepository.count());
        System.out.println("  Gates:            " + gateRepository.count());
        System.out.println("  Seats:            " + seatRepository.count());
        System.out.println("  Passengers:       " + passengerRepository.count());
        System.out.println("  Employees:        " + employeeRepository.count());
        System.out.println("  Accounts:         " + accountRepository.count());
        System.out.println("  Crew:             " + crewRepository.count());
        System.out.println("  Flights:          " + flightRepository.count());
        System.out.println("  FlightSchedules:  " + flightScheduleRepository.count());
        System.out.println("  Tickets:          " + ticketRepository.count());
        System.out.println("  Baggage:          " + baggageRepository.count());
        System.out.println("========================================");
    }
}