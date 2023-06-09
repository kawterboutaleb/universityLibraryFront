import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';
import { User } from 'src/app/models/user.model';

import { UserService } from 'src/app/services/user.service';
import { RoleService } from 'src/app/services/role.service';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css']
  
})
export class UserSignUPComponent implements OnInit {
  
    user:User=new User();
    private bookIdToUpdate!: number;
    public isUpdateActive: boolean = false;
    myControl = new FormControl('');
    formControls: any;
    
    roles: Role[] = [];
    constructor(private  fb: FormBuilder, private userService:UserService,private roleService:RoleService, private route:ActivatedRoute , private router: Router) { 
    }
  
   
    registrationForm!: FormGroup;
  
    ngOnInit(): void {
      
      this.roles = Object.values(Role);
      this.registrationForm = this.fb.group({
        firstname:[''],
        lastname: [''],
        password: ['',Validators.required],
        email: ['',Validators.required],
        role :['']
       
        
      }); 
       
       //load sub roles
   /* this.roleService.getAllRoles().subscribe(roles =>{
      //this.scollections.push.apply(this.scollections,result);
      this.roles=roles;
     });*/
      
    }
  
    submit() {
      console.log(this.registrationForm.value)
      
      this.userService.saveUser(this.registrationForm.value)
        .subscribe(res => {
        const token = res.token;
          console.log(token);

      // Store the JWT token in local storage
      //localStorage.setItem('jwtToken', token);
     //console.log('JWT token is stored in local storage.');

  
          this.registrationForm.reset();
        });  
    
    /* 
    public redirectToDelate (edt_id: number) {
      this.bookService.deleteEditor(edt_id);
    }
   
    update() {
      this.bookService.updateBook(this.registrationForm.value, this.bookIdToUpdate)
        .subscribe(res => {
  
          this.registrationForm.reset();
        });
    }  */
  }
    clearForm(){
      this.registrationForm.reset();
  }
    
    }
