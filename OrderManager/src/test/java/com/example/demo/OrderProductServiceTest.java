package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.data.OrderProduct;
import com.example.demo.dto.OrderProductDTO;
import com.example.demo.dto.ProductDTO;
import com.example.demo.repository.OrderProductRepository;
import com.example.demo.service.OrderProductService;

@ExtendWith(MockitoExtension.class)
public class OrderProductServiceTest {
	@Mock
	private OrderProductRepository orderProductRepository;
	
	@InjectMocks
	private OrderProductService orderProductService;
	
	@Mock
	private ProductDTO productDTO;
	
	private OrderProduct orderProduct;
	private OrderProductDTO orderProductDTO;
	
	public static OrderProductDTO mapEntityToDto(OrderProduct orderProductEntity) {
		return OrderProductDTO.builder()
				//.orderId(orderProductEntity.getId())
				.productId(orderProductEntity.getProductId())
				.productQuantity(orderProductEntity.getProductQuantity()).build();
	}
	
	public static OrderProduct mapDTOtoEntity(OrderProductDTO orderProductDTO) {
		return OrderProduct.builder()
				//.orderId(orderProductEntity.getId())
				.productId(orderProductDTO.getProductId())
				.productQuantity(orderProductDTO.getProductQuantity()).build();
	}
	
	@BeforeEach
	void setUp() {
		orderProduct = OrderProduct.builder().productId(24345679).productQuantity(2).build();
		orderProductDTO = OrderProductDTO.builder().productId(24345679).productQuantity(2).build();
	}
	
	@Test
	void testSave() {// test method to save to the database
		when(orderProductRepository.save(orderProduct)).thenReturn(orderProduct);
		OrderProduct savedProduct = orderProductService.createOrderProduct(orderProductDTO);
		assertEquals(24345679,savedProduct.getProductId());//expected,actual	
	}
	
	@Test
	void testFindByOrderId() {
		UUID orderId = UUID.randomUUID();
		OrderProduct orderProduct = mapDTOtoEntity(orderProductDTO);
		when(orderProductRepository.findAllByOrderId(orderId)).thenReturn(List.of(orderProduct));
		List<ProductDTO> orderProducts = orderProductService.findByOrderId(orderId);
		assertEquals(1,orderProducts.size());// expected,actual
	}
}
