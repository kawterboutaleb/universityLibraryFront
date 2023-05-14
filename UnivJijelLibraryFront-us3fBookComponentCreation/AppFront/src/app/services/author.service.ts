import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';

import { Author } from '../models/author.model';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http:HttpClient) {
   }

   public getAllAuthors():Observable<Author[]>{
      return this.http.get<Author[]>('http://localhost:8060/api/auth/authors');
   }

   

   public saveAuthor(book:Author){
      return this.http.post<Author>('http://localhost:8060/api/auth/add', book);
   }

   public getAuthor(ID:number):Observable<Author>{
    return this.http.get<Author>(`http://localhost:8060/api/auth/author/${ID}`);
 }
  
   public updateAuthor(author: Author, ID: number) {
   return this.http.put<Author>(`http://localhost:8060/api/auth/update/${ID}`, author);
   }
   public deleteAuthor(ID:number):Observable<void>{
    return this.http.delete<void>(`http://localhost:8060/api/auth/delete/${ID}`);
   }
   
}
