import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../models/interface';
import { ProductDao } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {
  token:string='';
  headers: any=null;

  constructor(private http:HttpClient) { }//port 8080 for the Gateway

  loadProducts():Observable<ProductDao[]>{
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
      console.log(this.token);//print token
    }
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.http.get<ProductDao[]>('http://localhost:8080/api/v1/inventory',{headers})
  }
  addProduct(request: ProductDao):Observable<ProductDao>{
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
      console.log(this.token);//print token
    }
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    console.log(this.token);//print token
    return this.http.post<ProductDao>('http://localhost:8080/api/v1/inventory/products/add',request,{headers});
  }
  updateProduct(id:number,request:ProductDao):Observable<ProductDao>{
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
      console.log(this.token); //print token
    }
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    console.log(this.token);//print token
    return this.http.put<ProductDao>('http://localhost:8080/api/v1/inventory/products/update/' + id,request,{headers});
  }
  deleteProduct(id:number):Observable<ProductDao>{
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
      console.log(this.token); //print token
    }
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    console.log(id);
    return this.http.delete<ProductDao>('http://localhost:8080/api/v1/inventory/products/'+id,{headers});
  }
  getProductDetails(id:number):Observable<ProductDao>{
    if(localStorage.getItem('token') != null){
      this.token = localStorage.getItem('token') != null ? localStorage.getItem('token') !: "";
      console.log(this.token); 
    }
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    console.log(id);
    return this.http.get<ProductDao>('http://localhost:8080/api/v1/inventory/products/'+id,{headers});
  }

}
