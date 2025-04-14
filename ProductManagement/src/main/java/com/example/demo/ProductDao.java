
package com.example.demo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//deleted @Table and @Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDao {
	private int id;
	private int sku;
	private String name;
	private String description;
	private int initial_stock;
}