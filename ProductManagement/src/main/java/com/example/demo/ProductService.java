package com.example.demo;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service

public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ProductClient productClient;
	
	@Autowired
	private OrderClient orderClient;

	public ProductDao mapEntityToDao(ProductEntity productEntity) {

		return ProductDao.builder().id(productEntity.getId()).sku(productEntity.getSku()).name(productEntity.getName())
				.description(productEntity.getDescription()).initial_stock(productEntity.getInitial_stock()).build();
	}

	public ProductEntity mapDaoToEntity(ProductDao productDao) {

		return ProductEntity.builder().id(productDao.getId()).sku(productDao.getSku()).name(productDao.getName())
				.description(productDao.getDescription()).initial_stock(productDao.getInitial_stock()).build();
	}

	public List<ProductDao> getAllProducts() {
		List<ProductEntity> allProducts = productRepository.findAll();
		return allProducts.stream().map(this::mapEntityToDao).toList();
	}

	// a.Add Product
	public ProductDao addProduct(ProductDao productDao) {
		ProductEntity productEntity = mapDaoToEntity(productDao);
		productEntity = productRepository.save(productEntity);// save data into table

		// product client adding product to inventory
		InventoryStockDao inventoryStockDao = InventoryStockDao.builder().sku(productEntity.getSku())
				.quantity(productEntity.getInitial_stock()).build();
		productClient.addToInventory(inventoryStockDao);

		return mapEntityToDao(productEntity);
	}

	// b.Update Product Details
	public ProductDao updateProduct(int id, ProductDao productDao) {
		ProductEntity productEntity = productRepository.findById(id).orElse(null);
		if (productEntity != null) {
			productEntity.setName(productDao.getName());
			productEntity.setDescription(productDao.getDescription());
			productEntity.setInitial_stock(productDao.getInitial_stock());

			productEntity = productRepository.save(productEntity);// save data into table
			return mapEntityToDao(productEntity);
		} else
			return null;
	}

	// c.Delete Product
	public ProductDao deleteProduct(int id) {
		ProductEntity productEntity = productRepository.findById(id).orElse(null);
		if (productEntity != null) {
			productRepository.delete(productEntity);
			// product client deleting product from inventory by sku
			productClient.deleteFromInventory(productEntity.getSku());
			return mapEntityToDao(productEntity);
		} else
			return null;
	}

	// d. View Product Details
	public ProductDao getProductDetails(int id) {
		ProductEntity productEntity = productRepository.findById(id).orElse(null);
		return mapEntityToDao(productEntity);
	}

	/// api/v1/inventory/alerts for viewing low-stock alerts
	public List<InventoryStockDao> getAlerts() {
		return productClient.getAlerts();
	}

	// api/v1/inventory/orders/place to place order
	public String sendOrder(OrderRequestDTO orderRequestDTO) {
		return orderClient.sendOrder(orderRequestDTO);
	}
}
