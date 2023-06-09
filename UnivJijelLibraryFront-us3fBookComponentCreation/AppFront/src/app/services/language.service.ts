import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';

import { Language } from '../models/language.model';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http:HttpClient) {
   }

   public getAllLanguages():Observable<Language[]>{
      return this.http.get<Language[]>('http://localhost:8060/api/lang/langs');
   }

   

   public addLanguage(lang:Language){
      return this.http.post<Language>('http://localhost:8060/api/lang/add', lang);
   }

   public updateLanguage(lang: Language, ID: number) {
   return this.http.put<Language>(`http://localhost:8060/api/lang/update/${ID}`, lang);
   }
   public deleteLanguage(ID:number):Observable<void>{
    return this.http.delete<void>(`http://localhost:8060/api/lang/delete/${ID}`);
   }
   
}