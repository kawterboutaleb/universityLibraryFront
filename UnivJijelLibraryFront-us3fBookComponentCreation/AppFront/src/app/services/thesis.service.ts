import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';

import { Thesis } from '../models/thesis.model';


@Injectable({
  providedIn: 'root'
})
export class ThesisService {

  constructor(private http:HttpClient) {
   }

   public getThesis():Observable<Thesis[]>{
      return this.http.get<Thesis[]>('http://localhost:8060/api/thesis/thesis');
   }

   

   public createThesis (thesis:Thesis):Observable<Thesis>{
      return this.http.post<Thesis>('http://localhost:8060/api/thesis/add', thesis);
   }

   public getThesisByID(ID:number):Observable<Thesis>{
    return this.http.get<Thesis>(`http://localhost:8060/api/thesis/thesis/${ID}`);
 }
  /*
   public updateBook(ID:number):Observable<void>{
    return this.http.put<void>(`http://localhost:8060/api/doc/${ID}`);
}   */

   public deleteThesis(bocId:number):Observable<void>{
    return this.http.delete<void>(`http://localhost:8060/api/thesis/delete/${bocId}`);
   }
   /*
   loadCategories():Observable<Category[]>{

    return this.http.get<Category[]>('http://localhost:8080/rest/category/api/allCategories');
  } */
}
