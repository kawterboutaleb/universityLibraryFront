import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';

import { DocFormat } from '../models/docFormat.model';


@Injectable({
  providedIn: 'root'
})
export class DocFormatService {

  constructor(private http:HttpClient) {
   }

   public getAllDocFormat():Observable<DocFormat[]>{
      return this.http.get<DocFormat[]>('http://localhost:8060/api/docFormat/docFormat');
   }

   

   public saveDocFormat(docFormat:DocFormat){
      return this.http.post<DocFormat>('http://localhost:8060/api/docFormat/add', docFormat);
   }

   public getDocFormat(ID:number):Observable<DocFormat>{
    return this.http.get<DocFormat>(`http://localhost:8060/api/docFormat/docFormat/${ID}`);
 }
  
   public updateDocFormatr(docFormat: DocFormat, ID: number) {
   return this.http.put<DocFormat>(`http://localhost:8060/api/docFormat/update/${ID}`, docFormat);
   }
   public deleteDocFormat(ID:number):Observable<void>{
    return this.http.delete<void>(`http://localhost:8060/api/docFormat/delete/${ID}`);
   }
   
}
