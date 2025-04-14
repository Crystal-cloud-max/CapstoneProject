import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryStockDao } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  token:string='';
  headers: any=null;

  constructor(private http:HttpClient) { }//port 8080 for the Gateway

  getLowStockAlerts():Observable<InventoryStockDao[]>{
    if(localStorage.getItem('token') != null){
          this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
          console.log(this.token);
        }
        const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
        return this.http.get<InventoryStockDao[]>('http://localhost:8080/api/v1/inventory/alerts',{headers});
  }//according to the project specs

  // loadStock():Observable<InventoryStockDao>{
  //   if(localStorage.getItem('token') != null){
  //     this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
  //     console.log(this.token); 
  //   }
  //   const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
  //   return this.http.get<InventoryStockDao>('http://localhost:8080/stockapi/all',{headers});
  // }

  // getStockById(id:number):Observable<InventoryStockDao>{
  //   if(localStorage.getItem('token') != null){
  //     this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
  //     console.log(this.token); 
  //   }
  //   const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
  //   return this.http.get<InventoryStockDao>('http://localhost:8080/stockapi/id/'+id,{headers});
  // }

  // getStockBySku(sku:number):Observable<InventoryStockDao>{
  //   if(localStorage.getItem('token') != null){
  //     this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
  //     console.log(this.token); 
  //   }
  //   const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
  //   return this.http.get<InventoryStockDao>('http://localhost:8080/stockapi/sku/'+sku,{headers});
  // }

  // addStock(request:InventoryStockDao):Observable<InventoryStockDao>{
  //   if(localStorage.getItem('token') != null){
  //     this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
  //     console.log(this.token);
  //   }
  //   const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
  //   console.log(this.token);
  //   return this.http.post<InventoryStockDao>('http://localhost:8080/stockapi/add',request,{headers});
  // }

  // updateStockById(id:number,request:InventoryStockDao):Observable<InventoryStockDao>{
  //   if(localStorage.getItem('token') != null){
  //     this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
  //     console.log(this.token);
  //   }
  //   const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
  //   console.log(this.token);
  //   return this.http.put<InventoryStockDao>('http://localhost:8080/stockapi/id/'+id,request,{headers});
  // }

  // updateStockBySku(sku:number,request:InventoryStockDao):Observable<InventoryStockDao>{
  //   if(localStorage.getItem('token') != null){
  //     this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
  //     console.log(this.token);
  //   }
  //   const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
  //   console.log(this.token);
  //   return this.http.put<InventoryStockDao>('http://localhost:8080/stockapi/sku/'+sku,request,{headers});
  // }

  // deleteStockById(id:number):Observable<InventoryStockDao>{
  //   if(localStorage.getItem('token') != null){
  //     this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
  //     console.log(this.token);
  //   }
  //   const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
  //   return this.http.delete<InventoryStockDao>('http://localhost:8080/stockapi/id/'+id,{headers});
  // }

  // deleteStockBySku(sku:number):Observable<InventoryStockDao>{
  //   if(localStorage.getItem('token') != null){
  //     this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
  //     console.log(this.token);
  //   }
  //   const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
  //   return this.http.delete<InventoryStockDao>('http://localhost:8080/stockapi/sku/'+sku,{headers});
  // }
}
