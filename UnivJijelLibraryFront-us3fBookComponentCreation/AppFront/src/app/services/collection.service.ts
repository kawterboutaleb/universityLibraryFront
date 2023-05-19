import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';

import { Collection } from '../models/collection.model';


@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http:HttpClient) {
   }

   public getAllCollections():Observable<Collection[]>{
      return this.http.get<Collection[]>('http://localhost:8060/api/collc/collctions');
   }

   

   public saveCollection(collection:Collection){
      return this.http.post<Collection>('http://localhost:8060/api/collc/add', collection);
   }

   public getCollection(ID:number):Observable<Collection>{
    return this.http.get<Collection>(`http://localhost:8060/api/collc/collection/${ID}`);
 }
  
   public updateCollection(collection: Collection, ID: number) {
   return this.http.put<Collection>(`http://localhost:8060/api/collc/update/${ID}`, collection);
   }
   public deleteCollection(ID:number):Observable<void>{
    return this.http.delete<void>(`http://localhost:8060/api/collc/delete/${ID}`);
   }
   
}
