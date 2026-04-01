package com.airportmanagementsystem.airportmanagementsystem.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import com.airportmanagementsystem.airportmanagementsystem.annotation.RoleRequired;
import com.airportmanagementsystem.airportmanagementsystem.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Arrays;

@Component
public class JwtInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Handle CORS Preflight request
        if (request.getMethod().equals("OPTIONS")) {
            return true;
        }

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                String username = jwtUtil.extractUsername(token);
                if (username != null && jwtUtil.validateToken(token, username)) {
                    String role = jwtUtil.extractRole(token);
                    
                    // RBAC check
                    if (handler instanceof HandlerMethod) {
                        HandlerMethod handlerMethod = (HandlerMethod) handler;
                        RoleRequired roleRequired = handlerMethod.getMethodAnnotation(RoleRequired.class);
                        if (roleRequired == null) {
                            roleRequired = handlerMethod.getBeanType().getAnnotation(RoleRequired.class);
                        }

                        if (roleRequired != null) {
                            String[] requiredRoles = roleRequired.value();
                            boolean hasRole = Arrays.asList(requiredRoles).contains(role);
                            if (!hasRole) {
                                response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
                                response.setHeader("Access-Control-Allow-Credentials", "true");
                                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                                response.getWriter().write("Forbidden: You do not have permission to access this resource");
                                return false;
                            }
                        }
                    }

                    // Token is valid, keep user info in request context
                    request.setAttribute("username", username);
                    request.setAttribute("employeeId", jwtUtil.extractEmployeeId(token));
                    request.setAttribute("role", role);
                    return true;
                }
            } catch (Exception e) {
                // Return 401 Unauthorized for invalid/expired tokens
            }
        }

        // Return HTTP 401 Unauthorized — must include CORS header so browser can read the response
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("Unauthorized: Missing or invalid token");
        return false;
    }
}
