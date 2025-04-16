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


@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {
	@Mock
	private ProductRepository productRepository;

	@InjectMocks
	private ProductService productService;

	@Mock
	private ProductClient productClient;
	
	@Mock
	private OrderClient orderClient;

	private ProductEntity productEntity;
	private ProductDao productDao;
	
	public ProductDao mapEntityToDao(ProductEntity productEntity) {
		return ProductDao.builder().id(productEntity.getId()).sku(productEntity.getSku()).name(productEntity.getName())
				.description(productEntity.getDescription()).initial_stock(productEntity.getInitial_stock()).build();
	}
	
	public ProductEntity mapDaoToEntity(ProductDao productDao) {
		return ProductEntity.builder().id(productDao.getId()).sku(productDao.getSku()).name(productDao.getName())
				.description(productDao.getDescription()).initial_stock(productDao.getInitial_stock()).build();
	}

	@BeforeEach
	void setUp() {// run before each test
		productEntity = ProductEntity.builder().id(17).sku(3333333).name("cookie").description("chocolate chip")
				.initial_stock(2).build();
		productDao = ProductDao.builder().id(17).sku(3333333).name("cookie").description("chocolate chip")
				.initial_stock(2).build();
	}

	@Test
	void testSave() {// test method to save to the database
		when(productRepository.save(productEntity)).thenReturn(productEntity);
		ProductDao savedProduct = productService.addProduct(productService.mapEntityToDao(productEntity));
		assertEquals("cookie", savedProduct.getName());// expected,actual
	}
	
	@Test
	void testSaveAll() {//test method to get all
		ProductEntity productEntity = mapDaoToEntity(productDao);
		when(productRepository.findAll()).thenReturn(List.of(productEntity));
		List<ProductDao> products = productService.getAllProducts();
		assertEquals(1,products.size());// expected,actual
	}
	
	@Test
	void testGetById() {
		when(productRepository.findById(17)).thenReturn(Optional.of(productEntity));
		ProductDao found = productService.getProductDetails(17);
		assertEquals("cookie",found.getName());
	}
	
	@Test
	void testUpdate() {
		ProductDao newProduct = ProductDao.builder().sku(3333333).name("icecream").description("chocolate chip")
				.initial_stock(2).build();
		when(productRepository.findById(17)).thenReturn(Optional.of(productEntity));
		when(productRepository.save(any(ProductEntity.class))).thenReturn(productService.mapDaoToEntity(newProduct));
		
		ProductDao result = productService.updateProduct(17,newProduct);//call function for object
		assertEquals("icecream",result.getName());//expected,actual	
	}
	
	@Test
	void testDelete() {
		doNothing().when(productRepository).deleteById(18);
		productService.deleteProduct(18);//call function
		verify(productRepository,times(1)).deleteById(18);//check one time
	}

}
