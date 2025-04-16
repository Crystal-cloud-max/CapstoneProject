package com.example.demo;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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

@ExtendWith(MockitoExtension.class)
public class InventoryStockServiceTest {
	@Mock
	private InventoryStockRepository inventoryStockRepository;
	
	@InjectMocks
	private InventoryStockService inventoryStockService;
	
	private InventoryStockEntity inventoryStockEntity;
	private InventoryStockDao inventoryStockDao;
	
	public static InventoryStockDao mapEntityToDao(InventoryStockEntity inventoryStockEntity) {
		return InventoryStockDao.builder().sku(inventoryStockEntity.getSku()).quantity(inventoryStockEntity.getQuantity()).build();
	}
	
	public static InventoryStockEntity mapDaoToEntity(InventoryStockDao inventoryStockDao) {
		return InventoryStockEntity.builder().sku(inventoryStockDao.getSku()).quantity(inventoryStockDao.getQuantity()).build();
	}
	
	@BeforeEach
	void setUp() {// run before each test
		inventoryStockEntity = InventoryStockEntity.builder()
				//.id(20)
				.sku(3333333)
				.quantity(2)
				.build();
		inventoryStockDao = InventoryStockDao.builder()
				.sku(3333333)
				.quantity(2)
				.build();	
	}
	
	@Test
	void testSaveAllLowStockAlerts() {
		InventoryStockEntity inventoryStockEntity = mapDaoToEntity(inventoryStockDao);
		when(inventoryStockRepository.findAll()).thenReturn(List.of(inventoryStockEntity));
		List<InventoryStockDao> stockAlerts = inventoryStockService.getLowStockAlerts();
		assertEquals(1,stockAlerts.size());// expected,actual
	}
	
	@Test
	void testSaveAllStockAlerts() {
		InventoryStockEntity inventoryStockEntity = mapDaoToEntity(inventoryStockDao);
		when(inventoryStockRepository.findAll()).thenReturn(List.of(inventoryStockEntity));
		List<InventoryStockDao> stockAlerts = inventoryStockService.getAllInventoryStock();
		assertEquals(1,stockAlerts.size());// expected,actual
	}
	
	@Test
	void testGetById() {
		when(inventoryStockRepository.findById(19)).thenReturn(Optional.of(inventoryStockEntity));
		InventoryStockDao found = inventoryStockService.getInventoryStockById(19);
		assertEquals(3333333,found.getSku());// expected,actual
	}
	
	@Test
	void testGetBySku() {
		when(inventoryStockRepository.findBySku(3333333)).thenReturn(Optional.of(inventoryStockEntity));
		InventoryStockDao found = inventoryStockService.getInventoryStockBySku(3333333);
		assertEquals(3333333,found.getSku());// expected,actual
	}
	
	@Test
	void testSave() {// test method to save to the database
		when(inventoryStockRepository.save(inventoryStockEntity)).thenReturn(inventoryStockEntity);
		InventoryStockDao savedStock= inventoryStockService.addInventoryStock(mapEntityToDao(inventoryStockEntity));
		assertEquals(3333333, savedStock.getSku());// expected,actual
	}
	
	@Test
	void testUpdateBySku() {
		InventoryStockDao newStock = InventoryStockDao.builder().sku(44444).quantity(2).build();
		when(inventoryStockRepository.findBySku(3333333)).thenReturn(Optional.of(inventoryStockEntity));
		when(inventoryStockRepository.save(any(InventoryStockEntity.class))).thenReturn(mapDaoToEntity(newStock));
		
		InventoryStockDao result = inventoryStockService.updateInventoryStockBySku(3333333, newStock);//call function for object
		assertEquals(44444,result.getSku());//expected,actual	
	}
	
	@Test
	void testDeleteById() {
		doNothing().when(inventoryStockRepository).deleteById(19);
		inventoryStockService.deleteInventoryStockById(19);//call function
		verify(inventoryStockRepository,times(1)).deleteById(19);//check one time
	}
	
	@Test
	void testDeleteBySku() {
		doNothing().when(inventoryStockRepository).deleteById(19);
		inventoryStockService.deleteInventoryStockBySku(3333333);//call function
		verify(inventoryStockRepository,times(1)).deleteById(19);//check one time
	}
	
}
