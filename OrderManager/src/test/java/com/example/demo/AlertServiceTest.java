package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.data.Alert;
import com.example.demo.dto.AlertDTO;
import com.example.demo.repository.AlertRepository;
import com.example.demo.service.AlertService;

@ExtendWith(MockitoExtension.class)
public class AlertServiceTest {
	@Mock
	private AlertRepository alertRepository;
	
	@InjectMocks
	private AlertService alertService;
	
	private Alert alert;
	private AlertDTO alertDTO;
	
	public static AlertDTO mapEntityToDTO(Alert alert) {
		return AlertDTO.builder()
        .productSKU(alert.getProductId())
        .quantity(alert.getProductQuantity())
        .build();
		
	}
	
	public static Alert mapDTOToEntity(AlertDTO alertDTO) {
		return Alert.builder()
        .productId(alertDTO.getProductSKU())
        .productQuantity(alertDTO.getQuantity())
        .build();	
	}
	
	@BeforeEach
	void setUp() {// run before each test
		alert = Alert.builder().productId(1).productQuantity(1).build();
		alertDTO = AlertDTO.builder().productSKU(1).quantity(1).build();
	}
	
	@Test
	void testSave() {// test method to save to the database
		when(alertRepository.save(alert)).thenReturn(alert);
		Alert savedAlert = alertService.createAlert(alertDTO);
		assertEquals(1,savedAlert.getProductId());
	}
	
	@Test
	void testSaveAll() {
		Alert alert = mapDTOToEntity(alertDTO);
		when(alertRepository.findAll()).thenReturn(List.of(alert));
		List<AlertDTO> alerts = alertService.getAlerts();//call function stored in a list
		assertEquals(1,alerts.size());//expected,actual
	}
	
}
