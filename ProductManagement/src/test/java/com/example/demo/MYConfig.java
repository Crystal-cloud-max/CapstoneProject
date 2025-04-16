package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MYConfig {
	
	@Bean
	public ProductService service(){
		return new ProductService();
	}
}
