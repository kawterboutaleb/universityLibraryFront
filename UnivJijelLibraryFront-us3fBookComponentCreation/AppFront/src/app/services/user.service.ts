import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable, map, pipe, tap} from 'rxjs';

import { User } from '../models/user.model';





@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    private isLoggedIn = false;

  
    constructor(private http:HttpClient) {
     }

     public saveUser(user:User){
        return this.http.post<User>('http://localhost:8060/api/v1/auth/register', user);
     }
     public login(user:User){
      return this.http.post<User>('http://localhost:8060/api/v1/auth/authenticate',user)
      .pipe(
        tap((response) => {
          // Check the response for a successful login condition
          if (response && response.token) {
            this.isLoggedIn = true;
          }
        })
      );
      
   }
   isLoggedInUser(): boolean {
    return this.isLoggedIn;
  }
  

  /* public login(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8060/api/v1/auth/authenticate', user).pipe(
      tap((response) => {
        // Extract the token from the response and store it in the token property
        this.token = response.token;
      })
    );
  }*/

  /*public getToken(): string {
    return this.token;
  }*/
   }