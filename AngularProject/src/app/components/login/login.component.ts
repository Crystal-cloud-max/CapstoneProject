import { Component, Inject,OnInit } from '@angular/core';
import { AuthRequest } from '../models/model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  auth : AuthRequest = new AuthRequest();//object of class
  status : boolean = false;//status if user is logged in

  //service = Inject(MainService);///A token that represents a dependency that should be injected. 
  constructor(private service:MainService){}
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  
  login(){
    console.log(this.auth);//print logged in user
    //check that password is at least 7 characters or username is not blank
    if(this.auth.password.length >= 7 || this.auth.username != ''){
      this.service.login(this.auth).subscribe((result : any) =>{
        if(result.token.length > 20){
          //alert("Successfully logged in");
          console.log(result.token);//print token
          localStorage.setItem('token',result.token);
          this.status=true;
        } else {
          this.status=false;
          alert(result.token);
        }
      });
    } else {//if not logged in
      this.status=false;
      alert('Username reqired and password must be at least 7 characters');
    }
  }//end of login

  // logout(){
  //   localStorage.removeItem('token');
  //   localStorage.clear();
    
  // }
}
