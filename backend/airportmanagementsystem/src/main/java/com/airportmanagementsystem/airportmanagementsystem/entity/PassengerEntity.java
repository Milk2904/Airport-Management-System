package com.airportmanagementsystem.airportmanagementsystem.entity;
import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "passenger")
public class PassengerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long passengerId;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    private String passportNumber;

    private String nationality;

    private String phoneNumber;

    private String email;

    @OneToMany(mappedBy = "passenger")
    private List<TicketEntity> tickets;

    @OneToMany(mappedBy = "passenger")
    private List<BaggageEntity> baggages;

    // Getters and Setters
    public Long getPassengerId() {
        return passengerId;
    }   
    public void setPassengerId(Long passengerId) {
        this.passengerId = passengerId;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getPassportNumber() {
        return passportNumber;
    }
    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
    }
    public String getNationality() {
        return nationality;
    }
    public void setNationality(String nationality) {
        this.nationality = nationality;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public List<TicketEntity> getTickets() {
        return tickets;
    }
    public void setTickets(List<TicketEntity> tickets) {
        this.tickets = tickets;
    }
    public List<BaggageEntity> getBaggages() {
        return baggages;
    }
    public void setBaggages(List<BaggageEntity> baggages) {
        this.baggages = baggages;
    }
}