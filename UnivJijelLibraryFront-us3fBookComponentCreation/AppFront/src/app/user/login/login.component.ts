import { Component, OnInit , Output, EventEmitter } from '@angular/core';
import { FormBuilder ,FormGroup, NgForm, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private  fb: FormBuilder, private userService:UserService, private route:ActivatedRoute , private router: Router) { 
  }
  username: string;
  password: string;
  public isUpdateActive: boolean = false;
  registrationForm!: FormGroup;
  
  /*isGoLogin: boolean = false;
  handleGoLogin(goLogin: boolean) {
    this.isGoLogin = goLogin ;}*/

  ngOnInit(): void {

    this.registrationForm = this.fb.group({
      
      password: ['',Validators.required],
      username: ['',Validators.required],
    });

    /*this.subscribeToLoggedInEvent();
    
    */ 
  
   
}

/*subscribeToLoggedInEvent() {
  // Subscribe to the loggedIn event and log emitted values
  this.loggedIn.subscribe(value => {
    console.log('Emitted value:', value);
  });
}*/



@Output() loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();
  
submit() {
  console.log(this.registrationForm.value)
  
  this.userService.login(this.registrationForm.value)
    .subscribe(res => {
      const token = res.token;
      const role = res.role;
      console.log(token);
      console.log(role);
    
      sessionStorage.setItem('jwtToken', token);
      sessionStorage.setItem('role', role);
      console.log('JWT token is stored in Session Storage.');

      this.registrationForm.reset();
      this.loggedIn.emit(true);
      
    }, error => {
      
      this.loggedIn.emit(false);
      console.error('Login error:', error);
    
    });  

    
}

  
 //this.router.navigate(['/home']);


}
 
 
