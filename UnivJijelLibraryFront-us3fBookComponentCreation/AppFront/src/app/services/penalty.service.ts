import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';

import { Penalty } from '../models/penalty.model';


@Injectable({
  providedIn: 'root'
})
export class PenaltyService {

  constructor(private http:HttpClient) {
   }

   public getAllPenaltys():Observable<Penalty[]>{
      return this.http.get<Penalty[]>('http://localhost:8060/api/penalty/penaltys');
   }


  
}
