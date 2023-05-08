import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserLoginService } from '../services/user-login.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user:User =new User();
  constructor(private userLoginservice:UserLoginService) { }

  ngOnInit(): void {
  }

  userLogin(){
    this.userLoginservice.loginUser(this.user).subscribe(
      data=>{alert("login successufully")},
      error=>{alert ("please enter correct data")}
    );
    console.log("user: "+ this.user.userId + "   " + this.user.userPassword);
  }
}
