import { Component, OnInit } from '@angular/core';
import { SupplierDTO } from '../models/model';
import { SupplierService } from '../services/supplier.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupplierInfoComponent } from "../supplier-info/supplier-info.component";

@Component({
  selector: 'app-supplier',
  imports: [CommonModule, FormsModule, SupplierInfoComponent],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit {
  supplier:SupplierDTO = new SupplierDTO();//object of the class
  suppliers:SupplierDTO[] = [];//array for the class

  status:boolean = false;

  supplierId:number = -1;//to fetch product details for the if statement

  updateId:number = -1;//to edit by id

  constructor(private service:SupplierService){ }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  selectSupplier(id:number){
    this.supplierId = id;
  }//to select supplier by id

  loadSuppliers(){
    this.service.loadSuppliers().subscribe((result:SupplierDTO[]) => {
      this.suppliers = result;//assign result to array
      console.log(result);//print array of objects
    },(error:any)=>{
      alert(error);
    });
  }

  insertSupplier(){
    const token = localStorage.getItem('token');//for the token
    console.log(token);//print token

    console.log(this.supplier);//print this object
    if(this.updateId == -1){
      this.service.insertSupplier(this.supplier).subscribe((result:SupplierDTO)=>{
        if(result.name.length > 0){
          this.status=true;
          alert('supplier inserted');
          this.loadSuppliers();//call function 
        }else{
          alert('supplier not inserted');
        }
      });

    }else{
      this.updateSupplier(this.supplier.id,this.supplier);
    } 
    this.supplier = new SupplierDTO();
    this.updateId = -1;
  }

  updateSupplier(id:number,supplier:SupplierDTO){  
    this.service.updateSupplier(supplier.id,this.supplier).subscribe((result:SupplierDTO)=>{
      if(result.id > 0){
        this.status=true;
        alert('updated');
      }
    });
  }

  updateSet(id:number){
    this.updateId=0;
    this.supplier=this.suppliers[id];
  }

  deleteSupplier(id:number){
    console.log(id);//print id to be deleted

    this.service.deleteSupplier(id).subscribe((result:SupplierDTO)=>{
      if(result.id > 0){
        this.status = true;
        alert('supplier deleted');
        this.loadSuppliers();//call function
      }else{
        alert('supplier not deleted');
      }
    });
  }//end of delete
}
