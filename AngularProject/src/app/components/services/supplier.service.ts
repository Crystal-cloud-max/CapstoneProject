import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InventoryStockDao, SupplierDTO } from '../models/model';
import { Observable } from 'rxjs/internal/Observable';
import { APIResponseModel } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  token:string='';
  headers: any=null;

  constructor(private http:HttpClient) { }//port 8080 for the Gateway

  insertSupplier(request:SupplierDTO):Observable<SupplierDTO>{
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
      console.log(this.token); 
    }
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.http.post<SupplierDTO>('http://localhost:8080/supplier/insert',request,{headers});
  }

  loadSuppliers():Observable<SupplierDTO[]>{
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
      console.log(this.token); 
    }
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.http.get<SupplierDTO[]>('http://localhost:8080/supplier',{headers});
  }

  getSupplierById(id:number):Observable<SupplierDTO>{
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
      console.log(this.token); 
    }
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.http.get<SupplierDTO>('http://localhost:8080/supplier/id/'+id,{headers});
  }

  getSupplierByName(name:string):Observable<SupplierDTO>{
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
      console.log(this.token); 
    }
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.http.get<SupplierDTO>('http://localhost:8080/supplier/name/'+name,{headers});
  }

  updateSupplier(id:number,request:SupplierDTO):Observable<SupplierDTO>{
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
      console.log(this.token); 
    }
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.http.put<SupplierDTO>('http://localhost:8080/supplier/update/'+id,request,{headers})
  }

  deleteSupplier(id:number):Observable<SupplierDTO>{
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
      console.log(this.token); 
    }
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.http.delete<SupplierDTO>('http://localhost:8080/supplier/delete/'+id,{headers});
  }
}
