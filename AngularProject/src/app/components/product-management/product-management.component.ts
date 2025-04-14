import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InventoryStockDao, OrderRequestDTO, ProductDao } from '../models/model';
import { APIResponseModel } from '../models/interface';
import { ProductManagementService } from '../services/product-management.service';
import { ProductDetailsComponent } from "../product-details/product-details.component";

@Component({
  selector: 'app-product-management',
  imports: [FormsModule, CommonModule, ProductDetailsComponent],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent implements OnInit{
  product:ProductDao = new ProductDao();//object of class
  products:ProductDao[] = [];//array for the class

  stockAlert:InventoryStockDao = new InventoryStockDao();//object of class
  stockAlerts:InventoryStockDao[] = [];//array for the class

  order:OrderRequestDTO = new OrderRequestDTO();//object of class
  orders:OrderRequestDTO[] = [];//array for the class

  status:boolean=false;//status if product is added or updated
  productId:number=-1;//to fetch product details for the if statement
  updateId:number = -1;//to edit a product by id
  isDisabled:boolean = false;//for a unique sku

  constructor(private service:ProductManagementService){ }

  ngOnInit(): void {
    this.loadProducts();
  }

  selectProduct(id:number){
    this.productId = id;
  }//to select product details get its id

  loadProducts(){
    this.service.loadProducts().subscribe((result : ProductDao[]) =>{
      this.products = result;//assign response to daos class
      console.log(result);//print array of objects
    },(error:any)=>{
      alert(error);
    });
  }

  updateProduct(id: number,product:ProductDao){
    this.service.updateProduct(product.id,this.product).subscribe((result:ProductDao)=>{
      if(result.id > 0){
        alert('updated');
      }
    });
  }

  update(id:number){
    this.updateId=0;
    this.product=this.products[id];
    this.isDisabled=true;
  }

  addProduct(){
    const token = localStorage.getItem('token');//for the token
    console.log(token);//print token 
    console.log(this.product);//print object
    
    if(this.updateId==-1){
      this.service.addProduct(this.product).subscribe((result : ProductDao) =>{
        if(result.description.length>0){
          this.status=true;
          alert('added');
          this.loadProducts();//call function
        }else{
          alert('not added');
        } 
      }) 
    }else{
      this.updateProduct(this.product.id,this.product);
    }
    this.product = new ProductDao();
    this.updateId = -1;
    this.isDisabled=false;
  }//end of add
 
  deleteProduct(id:number){
    console.log(id);//print id to be deleted
 
    this.service.deleteProduct(id).subscribe((result:ProductDao) =>{
      if(result.id > 0){
        this.status=true;
        alert('product deleted');
        this.loadProducts();//call function
      }else {
        alert('not deleted');
      }
    })
  }//end of delete
  
}
