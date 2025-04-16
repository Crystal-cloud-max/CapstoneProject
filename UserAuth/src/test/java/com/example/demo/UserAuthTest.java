package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
public class UserAuthTest {
	@Mock
	private UserCredentialRepository userCredentialRepository;
	
	@InjectMocks
	private AuthService authService;
	
	private UserCredential userCredential;
	
	@Mock
	private PasswordEncoder passwordEncoder;
	
	@Mock
	private AuthConfig authConfig;
	
	@Mock
	private JwtService jwtService;
	
	@BeforeEach
	void setUp() {
		userCredential = UserCredential.builder()
				.name("channing")
				.email("channing@yahoo.com")
				.password("passchanning")
				.role(Role.STAFF)
				.build();
	}
	@Test
	void testSave(){
		String encodedPassword = "encodedPassword123";
		when(passwordEncoder.encode("passchanning")).thenReturn(encodedPassword);
		when(userCredentialRepository.save(userCredential)).thenReturn(userCredential);
		
		String savedUser = authService.saverUser(userCredential);
		
		assertEquals("Inserted New Record",savedUser);
		verify(passwordEncoder).encode("passchanning");
		verify(userCredentialRepository).save(Mockito.any(UserCredential.class));
		assertEquals(encodedPassword,userCredential.getPassword());	
	}
	
	@Test
	void testGenerateToken() {
		String username = "testuser";
		String expectedToken = "mocked-jwt-token";
		when(jwtService.generateToken(username)).thenReturn(expectedToken);
		assertEquals(expectedToken,authService.generateToken(username));//expected,actual
		verify(jwtService).generateToken(username);
	}
	
}
