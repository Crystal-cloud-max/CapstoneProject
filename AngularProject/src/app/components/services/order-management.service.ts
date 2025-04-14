import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertsDTO, OrderDTO, OrderRequestDTO } from '../models/model';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class OrderManagementService {
  token:string='';
  headers: any=null;

  constructor(private http:HttpClient) { }//port 8080 for the Gateway

  placeOrder(request:OrderRequestDTO):Observable<OrderDTO>{
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
      console.log(this.token);
    }
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    console.log(this.token);
    return this.http.post<OrderDTO>('http://localhost:8080/orders/place',request,{headers});
  }

  getOrders():Observable<OrderDTO[]>{
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
      console.log(this.token);
    }
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});

    return this.http.get<OrderDTO[]>('http://localhost:8080/orders',{headers});
  }

  getOrder(id:number):Observable<OrderDTO>{
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
      console.log(this.token);
    }
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    console.log(this.token);
    return this.http.get<OrderDTO>('http://localhost:8080/orders/'+id,{headers});
  }

  updateOrder(id:number,request:OrderRequestDTO):Observable<OrderDTO>{
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
      console.log(this.token);
    }
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.http.put<OrderDTO>('http://localhost:8080/orders/'+id,request,{headers});
  }

  deleteOrder(id:number):Observable<OrderDTO>{
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
      console.log(this.token);
    }
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.http.delete<OrderDTO>('http://localhost:8080/orders/'+id,{headers});
  }

  getAlerts():Observable<AlertsDTO>{
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
      console.log(this.token);
    }
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.http.get<AlertsDTO>('http://localhost:8080/api/v1/inventory/alerts',{headers});
  }

}
