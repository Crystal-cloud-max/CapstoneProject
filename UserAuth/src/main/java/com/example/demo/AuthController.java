package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/security")
public class AuthController {

	@Autowired
	private AuthService service;

	@Autowired
	private AuthenticationManager manager;
	
	@PostMapping("/register")
	public JWTDao addUser(@RequestBody UserCredential userCredential) {
		//System.out.println("Register Request " + userCredential);
		String message = service.saverUser(userCredential);
		return JWTDao.builder().
				message(message)
				.token(message)
				.build();
	}

	@PostMapping("/login")
	public JWTDao generateToken(@RequestBody AuthRequest authRequest) {
		Authentication auth = manager.authenticate(
				new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
				);

		if (auth.isAuthenticated()) {
			String token = service.generateToken(authRequest.getUsername());;
			return JWTDao.builder()
					.message("Login ")
					.token(token)
					.build();
		} else throw new RuntimeException("Invalid");
		
	}

	@GetMapping("/validate")
	public String validToken(@RequestParam("token") String token) {
		service.validateToken(token);
		return "Valid Token";
	}

}
