package main.java.com.airportmanagementsystem.airportmanagementsystem.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private String token;
    private String username;
    private String role;
    private Long employeeId;
    private String employeeName;
}