package main.java.com.airportmanagementsystem.airportmanagementsystem.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.airportmanagementsystem.airportmanagementsystem.entity.Account;
import com.airportmanagementsystem.airportmanagementsystem.entity.Employee;
import com.airportmanagementsystem.airportmanagementsystem.entity.Role;
import com.airportmanagementsystem.airportmanagementsystem.repository.AccountRepository;
import com.airportmanagementsystem.airportmanagementsystem.repository.EmployeeRepository;
import com.airportmanagementsystem.airportmanagementsystem.repository.RoleRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initializeAdminAccount();
    }

    private void initializeAdminAccount() {
        // Check if admin account already exists
        if (accountRepository.existsByUsername("admin")) {
            System.out.println("Admin account already exists. Skipping initialization.");
            return;
        }

        // Create ADMIN role if it doesn't exist
        Role adminRole = roleRepository.findByRoleName("ADMIN");
        if (adminRole == null) {
            adminRole = new Role();
            adminRole.setRoleName("ADMIN");
            adminRole.setDescription("Administrator role with full access");
            roleRepository.save(adminRole);
            System.out.println("Created ADMIN role.");
        }

        // Create admin employee if doesn't exist
        Employee adminEmployee = employeeRepository.findByName("System Administrator");
        if (adminEmployee == null) {
            adminEmployee = new Employee();
            adminEmployee.setName("System Administrator");
            adminEmployee.setEmail("admin@airport.com");
            adminEmployee.setPhone("0000000000");
            adminEmployee.setPosition("Administrator");
            adminEmployee.setRole(adminRole);
            employeeRepository.save(adminEmployee);
            System.out.println("Created admin employee.");
        }

        // Create admin account
        Account adminAccount = new Account();
        adminAccount.setUsername("admin");
        adminAccount.setPasswordHash(passwordEncoder.encode("admin123"));
        adminAccount.setStatus("ACTIVE");
        adminAccount.setEmployee(adminEmployee);

        accountRepository.save(adminAccount);
        System.out.println("Admin account created successfully!");
        System.out.println("Username: admin");
        System.out.println("Password: admin123");
    }
}