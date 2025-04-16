package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.demo.service.AlertService;

@Configuration
public class MyConfig {
	@Bean
	public AlertService service(){
		return new AlertService();
	}

}
