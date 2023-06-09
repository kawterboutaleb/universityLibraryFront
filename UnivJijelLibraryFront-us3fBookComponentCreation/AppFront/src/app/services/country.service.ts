import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';

import { Country } from '../models/country.model';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) {
   }

   public getAllCountries():Observable<Country[]>{
      return this.http.get<Country[]>('http://localhost:8060/api/country/countrys');
   }

   

   public addCountry(country:Country){
      return this.http.post<Country>('http://localhost:8060/api/country/add', country);
   }

   public updateCountry(country: Country, ID: number) {
   return this.http.put<Country>(`http://localhost:8060/api/country/update/${ID}`, country);
   }

   public deleteCountry(ID:number):Observable<void>{
    return this.http.delete<void>(`http://localhost:8060/api/country/delete/${ID}`);
   }
   
}