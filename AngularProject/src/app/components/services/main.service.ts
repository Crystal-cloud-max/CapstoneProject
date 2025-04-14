import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest, UserCredential } from '../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  token:string='';
  headers: any=null;

  constructor(private http:HttpClient) { }//port 8080 for the Gateway

  register(request:UserCredential):Observable<any>{
    return this.http.post<any>('http://localhost:8080/security/register',request);
  }//for register new user
  
  login(request: AuthRequest):Observable<any>{
    return this.http.post<any>('http://localhost:8080/security/login',request);
  }//for authenticating login user
}
