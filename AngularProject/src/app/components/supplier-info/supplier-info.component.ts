import { Component, Input, OnInit } from '@angular/core';
import { SupplierDTO } from '../models/model';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-supplier-info',
  imports: [],
  templateUrl: './supplier-info.component.html',
  styleUrl: './supplier-info.component.css'
})
export class SupplierInfoComponent implements OnInit {
  supplier:SupplierDTO = new SupplierDTO();
  suppliers:SupplierDTO[] = [];

  constructor(private service:SupplierService){ }

  @Input() supplierId:number = -1;

  ngOnInit(): void {
    if(this.supplierId >= 0){
      this.getSupplierById(this.supplierId);
    }
  }

  getSupplierById(id:number){
    console.log(this.suppliers[id]);//print id from array
    const token = localStorage.getItem('token');//for the token
    console.log(token);//print token
    console.log(id);//print id
    console.log(this.supplier);//print object

    this.service.getSupplierById(id).subscribe((result:SupplierDTO)=>{
      if(result.id > 0){
        alert('fetched supplier');
        this.supplier = result;
      }else{
        alert('not fetched');
      }
    });
  }
}
