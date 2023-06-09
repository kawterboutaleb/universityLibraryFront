import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import {Observable, map} from 'rxjs';
import { LectorType } from '../models/lectorType.model';
import { Lector } from '../models/lector.model';





@Injectable({

  providedIn: 'root'

})

export class LectorService {




  constructor(private http:HttpClient) {

   }

 /*

   public getAllStudents(): Observable<Lector[]> {

    return this.http.get<Lector[]>('http://localhost:8060/api/lector/lectors');

 }

 */

 getAllStudents(): Observable<Lector[]> {

    return this.http.get<Lector[]>('http://localhost:8060/api/lector/lectors').pipe(

      map((lectors: Lector[]) => {

        // Filter lectors by attribute value equal to LectorType.Student

        return lectors.filter(lector => lector.lectorType === LectorType.student);

      })

    );

  }

  getAllprofessors(): Observable<Lector[]> {

    return this.http.get<Lector[]>('http://localhost:8060/api/lector/lectors').pipe(

      map((lectors: Lector[]) => {

        return lectors.filter(lector => lector.lectorType === LectorType.professor);

      })

    );

  }

  getAlllibrarians(): Observable<Lector[]> {

    return this.http.get<Lector[]>('http://localhost:8060/api/lector/lectors').pipe(

      map((lectors: Lector[]) => {

        return lectors.filter(lector =>lector.lectorType === LectorType.librarian);

      })

    );

  }

  createLectors(lectors: Lector[]): Observable<Lector[]> {

    return this.http.post<Lector[]>('http://localhost:8060/api/lector/addlist', lectors);

  }

 

}

