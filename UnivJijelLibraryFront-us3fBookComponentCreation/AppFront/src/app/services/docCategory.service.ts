import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';

import { DocCategory } from '../models/docCategory.model';


@Injectable({
  providedIn: 'root'
})
export class DocCategoryService {

  constructor(private http:HttpClient) {
   }

   public getAllDocCategories():Observable<DocCategory[]>{
      return this.http.get<DocCategory[]>('http://localhost:8060/api/docCat/documentCats');
   }

   

   public saveDocCategory(doCat:DocCategory){
      return this.http.post<DocCategory>('http://localhost:8060/api/docCat/add', doCat);
   }

   public getDocCategory(ID:number):Observable<DocCategory>{
    return this.http.get<DocCategory>(`http://localhost:8060/api/docCat/documentCat/${ID}`);
 }
  
   public updateDocCategory(doCat: DocCategory, ID: number) {
   return this.http.put<DocCategory>(`http://localhost:8060/api/docCat/update/${ID}`, doCat);
   }
   public deleteDocCategory(ID:number):Observable<void>{
    return this.http.delete<void>(`http://localhost:8060/api/docCat/delete/${ID}`);
   }
   
}