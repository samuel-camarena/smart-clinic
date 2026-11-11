package com.project.back_end.services;

import com.project.back_end.repo.AdminRepository;
import com.project.back_end.repo.DoctorRepository;
import com.project.back_end.repo.PatientRepository;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class TokenServiceTests {
    @Mock
    private AdminRepository adminRepo;
    @Mock
    private DoctorRepository doctorRepo;
    @Mock
    private PatientRepository patientRepo;
    private TokenService tokenService;
    
//    @Value("${jwt.secret}")
//    private final String JWT_SECRET;
//    @Value("${jwt.token.expiration.time.millis}")
//    private final long JWT_TOKEN_EXPIRATION_TIME_MILLIS;
//
//    public TokenServiceTests(String jwtSecret, long jwtTokenExpirationTimeMillis) {
//        JWT_SECRET = jwtSecret;
//        JWT_TOKEN_EXPIRATION_TIME_MILLIS = jwtTokenExpirationTimeMillis;
//    }
//
//    @BeforeEach
//    void setUp() {
//        tokenService = new TokenService(adminRepo, doctorRepo, patientRepo, JWT_TOKEN_EXPIRATION_TIME_MILLIS, JWT_SECRET);
//    }
//
//    @Test
//    void testTokenExtractEmail() throws Exception {
//        String expectedEmail = "sam@email.com";
//        String tokenJWS = tokenService.generateToken(expectedEmail);
//        String actualEmail = tokenService.extractEmail(tokenJWS);
//
//        assertThat(actualEmail).isNotBlank();
//        assertThat(actualEmail).isEqualTo(expectedEmail);
//    }
}
