import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';
import { Speciality } from '../models/speciality.model';



@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(private http:HttpClient) {
   }

   public getAllSpeciality():Observable<Speciality[]>{
      return this.http.get<Speciality[]>('http://localhost:8060/api/speciality/Specialities');
   }

   public saveSpeciality(speciality:Speciality){
    return this.http.post<Speciality>('http://localhost:8060/api/speciality/add', speciality);
 }

  
}
