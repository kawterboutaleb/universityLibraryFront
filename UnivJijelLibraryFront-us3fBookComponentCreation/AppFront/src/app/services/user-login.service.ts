import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private baseUrl:string ="http://localhost:8081/user/login"

  constructor(private http:HttpClient) {

   }

   loginUser(user: User) : Observable<object>{
      console.log('${this.baseUrl}')
      return this.http.get<object>('') ;
   }
}
