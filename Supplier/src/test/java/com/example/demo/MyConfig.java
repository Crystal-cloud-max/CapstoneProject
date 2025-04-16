package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.demo.service.SupplierService;

@Configuration
public class MyConfig {
	@Bean
	public SupplierService service() {
		return new SupplierService();
	}

}
