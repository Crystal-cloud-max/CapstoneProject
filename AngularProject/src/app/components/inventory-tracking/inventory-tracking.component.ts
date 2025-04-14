import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InventoryStockDao } from '../models/model';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-inventory-tracking',
  imports: [FormsModule,CommonModule],
  templateUrl: './inventory-tracking.component.html',
  styleUrl: './inventory-tracking.component.css'
})
export class InventoryTrackingComponent implements OnInit {
  stockAlert:InventoryStockDao = new InventoryStockDao();//object of the class
  stockAlerts:InventoryStockDao[] = [];//array for the class

  status:boolean = false;
 
  constructor(private service:InventoryService){ }

  ngOnInit(): void {
    this.getAlerts();
  }

  getAlerts(){
    this.service.getLowStockAlerts().subscribe((result:InventoryStockDao[]) =>{
      this.stockAlerts = result;
      console.log(result);
      this.status=true;
    },(error:any)=>{
      alert(error);
    });
  }//get alerts from the stock inventory
}
