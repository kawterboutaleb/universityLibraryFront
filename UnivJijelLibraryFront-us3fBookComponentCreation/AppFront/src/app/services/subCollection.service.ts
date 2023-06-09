import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable, map} from 'rxjs';

import { SubCollection } from '../models/subCollection.model';


@Injectable({
  providedIn: 'root'
})
export class SubCollectionService {

  constructor(private http:HttpClient) {
   }
   
   public getAllSubCollections():Observable<SubCollection[]>{
      return this.http.get<SubCollection[]>('http://localhost:8060/api/scollc/scollections');
   } 
   /*
   public getAllSubCollections(){
      return this.http.get('http://localhost:8060/api/scollc/scollections').pipe(
         map((response:[]) => response.map(item => item['scol_title']))
       );
   } */

   public saveSubCollection(subColl:SubCollection){
      return this.http.post<SubCollection>('http://localhost:8060/api/scollc/add', subColl);
   }

   public getSubCollection(ID:number):Observable<SubCollection>{
    return this.http.get<SubCollection>(`http://localhost:8060/api/scollc/scollection/${ID}`);
 }
  
   public updateSubCollection(subColl: SubCollection, ID: number) {
   return this.http.put<SubCollection>(`http://localhost:8060/api/scollc/update/${ID}`, subColl);
   }
   public deleteSubCollection(ID:number):Observable<void>{
    return this.http.delete<void>(`http://localhost:8060/api/scollc/delete/${ID}`);
   }
   
}