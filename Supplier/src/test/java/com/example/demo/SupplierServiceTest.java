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
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.dto.SupplierDTO;
import com.example.demo.entity.SupplierEntity;
import com.example.demo.repository.SupplierRepository;
import com.example.demo.service.SupplierService;

@ExtendWith(MockitoExtension.class)
public class SupplierServiceTest {
	@Mock
	private SupplierRepository supplierRepository;
	
	@InjectMocks
	private SupplierService supplierService;
	
	private SupplierEntity supplierEntity;
	private SupplierDTO supplierDTO;
	
	public static SupplierDTO convertToDto(SupplierEntity supplierEntity) {
		return SupplierDTO.builder()
				.id(supplierEntity.getId())
				.name(supplierEntity.getName())
				.contactInfo(supplierEntity.getContactInfo())
				.rating(supplierEntity.getRating())
				.build();
	}
	
	public static SupplierEntity convertToEntity(SupplierDTO supplierDTO) {
		return SupplierEntity.builder()
				.id(supplierDTO.getId())
				.name(supplierDTO.getName())
				.contactInfo(supplierDTO.getContactInfo())
				.rating(supplierDTO.getRating())
				.build();
	}
	
	@BeforeEach
	void setUp() {// run before each test
		supplierEntity = SupplierEntity.builder()
				//.id(17)
				.name("grace")
				.contactInfo("facebook")
				.rating("wonderful")
				.build();
		supplierDTO = SupplierDTO.builder()
				//.id(17)
				.name("grace")
				.contactInfo("facebook")
				.rating("wonderful")
				.build();	
	}
	
	@Test
	void testSave(){// test method to save to the database
		when(supplierRepository.save(supplierEntity)).thenReturn(supplierEntity);
		SupplierDTO savedSupplier = supplierService.insertSupplier(convertToDto(supplierEntity));
		assertEquals("grace",savedSupplier.getName());//expected,actual
	}
	
	@Test
	void testSaveAll() {//test method to get all
		SupplierEntity supplierEntity = convertToEntity(supplierDTO);
		when(supplierRepository.findAll()).thenReturn(List.of(supplierEntity));
		List<SupplierDTO> suppliers = supplierService.getAllSuppliers();
		assertEquals(1,suppliers.size());// expected,actual	
	}
	
	@Test
	void testGetById() {
		when(supplierRepository.findById(17)).thenReturn(Optional.of(supplierEntity));
		SupplierDTO found = supplierService.getSupplierById(17);
		assertEquals("grace",found.getName());//expected,actual
	}
	
	@Test
	void testGetByName() {
		when(supplierRepository.findByName("grace")).thenReturn(Optional.of(supplierEntity));
		SupplierDTO found = supplierService.getSupplierByName("grace");
		assertEquals("grace",found.getName());//expected,actual
	}
	
	@Test
	void testUpdate() {
		SupplierDTO newSupplier = SupplierDTO.builder()
				.name("crystal")
				.contactInfo("facebook")
				.rating("wonderful")
				.build();
		when(supplierRepository.findById(17)).thenReturn(Optional.of(supplierEntity));
		when(supplierRepository.save(any(SupplierEntity.class))).thenReturn(convertToEntity(newSupplier));
		
		SupplierDTO result = supplierService.updateSupplier(17, newSupplier);//call function for object
		assertEquals("crystal",result.getName());	//expected,actual
	}
	
	@Test
	void testDelete() {
		doNothing().when(supplierRepository).deleteById(17);
		supplierService.deleteSupplier(17);//call function
		verify(supplierRepository,times(1)).deleteById(17);	//check one time
	}

}
