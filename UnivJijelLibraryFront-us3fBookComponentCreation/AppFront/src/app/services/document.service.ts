import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';

import { Document } from '../models/document.model';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http:HttpClient) {
   }

   public getDocuments():Observable<Document[]>{
      return this.http.get<Document[]>('http://localhost:8060/api/doc/documents');
   }

   

   public createDocument (doc:Document):Observable<Document>{
      return this.http.post<Document>('http://localhost:8060/api/doc/add', doc);
   }

   public getDocument(ID:number):Observable<Document>{
    return this.http.get<Document>(`http://localhost:8060/api/doc/document/${ID}`);
 }
  /*
   public updateBook(ID:number):Observable<void>{
    return this.http.put<void>(`http://localhost:8060/api/doc/${ID}`);
}   */

   public deleteDocument(bocId:number):Observable<void>{
    return this.http.delete<void>(`http://localhost:8060/api/doc/delete/${bocId}`);
   }
   /*
   loadCategories():Observable<Category[]>{

    return this.http.get<Category[]>('http://localhost:8080/rest/category/api/allCategories');
  } */
}
