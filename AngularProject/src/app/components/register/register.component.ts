import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserCredential } from '../models/model';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  user: UserCredential = new UserCredential(); //object of class
  registeredUsers: UserCredential[] = []; //array for the class
  roles: string[] = ['ADMIN', 'STAFF'];//array for roles
  status : boolean = false;//status if user is registered

  //service = Inject(MainServiceService);///A token that represents a dependency that should be injected.
  constructor( private service: MainService) {}
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  
  registerUser() {
    // console.log(this.user);
    this.user.id = 0;
    this.service.register(this.user).subscribe((result: any) => {
      if (result.token) {
        //alert('Registered');
        this.status = true;
        console.log(result.token);
      }
    });
  } //end of registerUser()
}
