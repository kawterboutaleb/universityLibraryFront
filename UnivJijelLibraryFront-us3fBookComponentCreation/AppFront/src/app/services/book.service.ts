import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';

import { Book } from '../models/book.model';
import { Editor } from '../models/editor.model';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) {
   }

   public getAllBooks():Observable<Book[]>{
      return this.http.get<Book[]>('http://localhost:8060/api/book/books');
   }

   

   public saveBook(book:Book){
      return this.http.post<Book>('http://localhost:8060/api/book/add', book);
   }
   
   uploadFile(formData: FormData) {
    return this.http.post('http://localhost:8060/api/book/upload', formData);
  }

   public getBook(ID:number):Observable<Book>{
    return this.http.get<Book>(`http://localhost:8060/api/book/book/${ID}`);
 }
  
   public updateBook(book: Book, ID: number) {
   return this.http.put<Book>(`http://localhost:8060/api/book/update/${ID}`, book);
   }
   public deleteBook(bookId:number):Observable<void>{
    return this.http.delete<void>(`http://localhost:8060/api/book/delete/${bookId}`);
   }
   public getAllEditors():Observable<Editor[]>{
    return this.http.get<Editor[]>('http://localhost:8060/api/editor/editors');
 }
 public deleteEditor(ID:number):Observable<void>{
  return this.http.delete<void>(`http://localhost:8060/api/editor/delete/${ID}`);
 }
   
}
