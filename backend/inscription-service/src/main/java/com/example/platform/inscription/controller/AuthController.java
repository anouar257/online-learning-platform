package com.example.platform.inscription.controller;

import com.example.platform.inscription.entities.Etudiant;
import com.example.platform.inscription.repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private com.example.platform.inscription.security.JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Etudiant etudiant) {
        if (etudiantRepository.findByEmail(etudiant.getEmail()) != null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
        }
        // In a real app, hash the password here
        Etudiant saved = etudiantRepository.save(etudiant);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Etudiant etudiant = etudiantRepository.findByEmail(email);
        if (etudiant != null && etudiant.getPassword().equals(password)) {
            String token = jwtUtil.generateToken(email);
            return ResponseEntity.ok(Map.of(
                "token", token,
                "user", etudiant
            ));
        }
        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
    }
}
