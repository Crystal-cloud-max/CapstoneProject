import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderDTO, OrderRequestDTO, ProductDTO } from '../models/model';
import { OrderManagementService } from '../services/order-management.service';

@Component({
  selector: 'app-order-manager',
  imports: [FormsModule,CommonModule],
  templateUrl: './order-manager.component.html',
  styleUrl: './order-manager.component.css'
})
export class OrderManagerComponent implements OnInit {

  order:OrderDTO = new OrderDTO();
  orders:OrderDTO[] = [];

  SkuQuantityList: { sku: number, quantity: number }[] = [];
  orderRequest:OrderRequestDTO = new OrderRequestDTO();
  orderRequests:OrderRequestDTO[] = [];

  productDTO:ProductDTO = new ProductDTO();
  productDTOs:ProductDTO[]=[];

  status:boolean = false;
  orderId:number=-1;
  updateId:number = -1;

  constructor(private service:OrderManagementService){ }

  ngOnInit(): void {
    this.SkuQuantityList.push({ sku: 0, quantity: 0 });
    this.loadOrders();
  }

  selectOrder(id:number){
    this.orderId = id;
  }

  loadOrders(){
      this.service.getOrders().subscribe((result : OrderDTO[]) =>{
        this.orders = result;//assign response to daos class
        console.log(result);//print array of objects
      },(error:any)=>{
        alert(error);
      });
  }

  updateOrder(id: number,order:OrderRequestDTO){
      this.service.updateOrder(this.orderRequest.supplier_id,this.orderRequest).subscribe((result:OrderDTO)=>{
        if(result.orderId > 0){
          alert('updated');
        }
      });
  }

  update(id:number){
    this.updateId=0;
    this.orderRequest=this.orderRequests[id];
  }

  addSkuField() {
    this.SkuQuantityList.push({ sku: 0, quantity: 0 });
  }//adds new input rows for product

  resetForm() {
    this.SkuQuantityList = [{ sku: 0, quantity: 0 }];
    this.orderRequest = new OrderRequestDTO();
    this.updateId = -1;
  }

  placeOrder(){
    const token = localStorage.getItem('token');//for the token
        console.log(token);//print token
        console.log(this.orderRequest);//print object

        // const map = new Map<number, number>();
        // for (const item of this.tempSkuQuantityList) {
        //   if (item.sku && item.quantity) {
        //     map.set(item.sku, item.quantity);
        //   }
        // }
        // this.orderRequest.productSkusAndQuantities = map;

        const obj: { [key: number]: number } = {};
        for (const item of this.SkuQuantityList) {
          if (item.sku && item.quantity) {
            obj[item.sku] = item.quantity;
          }
        }
        this.orderRequest.productSkusAndQuantities = obj as any;

        if(this.updateId==-1){
          this.service.placeOrder(this.orderRequest).subscribe((result:OrderDTO) =>{
            if(result.orderId > 0){
              this.status=true;
              alert('order added');
              this.loadOrders();//call function
              this.resetForm();
            }else{
              alert('not added');
            } 
          }) 
        }else{
          this.updateOrder(this.order.orderId,this.orderRequest);
        }
        this.order = new OrderDTO();
        this.updateId = -1;
  }

  deleteOrder(id:number){
    console.log(id);//print id to be deleted

    this.service.deleteOrder(id).subscribe((result:OrderDTO)=>{
      if(result.orderId>0){
        //this.status=true;
        alert('not order deleted');
      }else{
        alert(' deleted');
        this.loadOrders();//call function
      }
    })
  }
}

  

