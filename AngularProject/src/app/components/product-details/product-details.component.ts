import { Component, Input, OnInit } from '@angular/core';
import { ProductDao } from '../models/model';
import { ProductManagementService } from '../services/product-management.service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product:ProductDao = new ProductDao();//object of class
  products:ProductDao[] = [];//array for the class

  constructor(private service:ProductManagementService) { 
  }

  @Input() productId:number = -1;//for user input to view details

  ngOnInit(): void {
    if(this.productId >= 0){
      this.getProductDetails(this.productId);
    }
  }

  getProductDetails(id:number){
    console.log(this.products[id]);//print id from array
    
    const token = localStorage.getItem('token');//for the token
    console.log(token);//print token
    console.log(id);//print id
    console.log(this.product);//print object
    
    this.service.getProductDetails(id).subscribe((result : ProductDao) =>{
      if(result.id > 0){
        alert('fetched product details');
        this.product = result;
        //this.loadProducts();//call function
      }else{
        alert('not fetched');
      }
    }) 
  }
}
