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

import com.example.demo.data.Order;
import com.example.demo.data.OrderProduct;
import com.example.demo.dto.OrderDTO;
import com.example.demo.dto.ProductDTO;
import com.example.demo.dto.SupplierDTO;
import com.example.demo.repository.OrderProductRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.service.OrderService;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {
	@Mock
	private OrderRepository orderRepository;
	
	@Mock
	private static OrderProductRepository orderProductRepository;
	
	@InjectMocks
	private OrderService orderService;
	
	@Mock
	private ProductDTO productDTO;
	
	@Mock
	private SupplierDTO supplierDTO;
	
	private Order order;
	private OrderDTO orderDTO;
	//private OrderProduct orderProduct;
	
	public static OrderDTO convertOrderToOrderDTO(Order finalOrder) {
        List<OrderProduct> orderProducts = orderProductRepository.findAllByOrderId(finalOrder.getOrderId());

        List<ProductDTO> productDTOList = orderProducts.stream().map(orderProduct -> ProductDTO.builder()
                .productId(orderProduct.getProductId())
                .productQuantity(orderProduct.getProductQuantity())
                .build()).toList();

        SupplierDTO supplierDTO = SupplierDTO.builder().id(finalOrder.getSupplierId()).build();

        return OrderDTO.builder()
                .orderId(finalOrder.getOrderId())
                .productList(productDTOList)
                .supplier(supplierDTO)
                .build();
    }
//	@BeforeEach
//	void setUp() {
//		order = Order.builder().supplierId(17).build();
//		productDTO = ProductDTO.builder().
//		supplierDTO = SupplierDTO.builder().id(17).build();
//		orderDTO = OrderDTO.builder().productList(null).supplier(null).build();
//		
//				
//	}
	

}
