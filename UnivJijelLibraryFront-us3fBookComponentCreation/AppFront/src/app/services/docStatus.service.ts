import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';
import { DocStatus } from '../models/docStatus.model';



@Injectable({
  providedIn: 'root'
})
export class DocStatuService {

  constructor(private http:HttpClient) {
   }

   public getAllDocStatus():Observable<DocStatus[]>{
      return this.http.get<DocStatus[]>('http://localhost:8060/api/docStatus/docStatus');
   }

   

}
