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
   public getAllStudents(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8060/api/user/users');
 } 
 */
 getAllStudents(): Observable<Lector[]> {
    return this.http.get<Lector[]>('http://localhost:8060/api/lector/lectors').pipe(
      map((users: Lector[]) => {
        // Filter users by attribute value equal to UserType.Student
        return users.filter(user => user.lectorType === LectorType.student);
      })
    );
  } 
  getAllprofessors(): Observable<Lector[]> {
    return this.http.get<Lector[]>('http://localhost:8060/api/lector/lectors').pipe(
      map((users: Lector[]) => {
        return users.filter(user => user.lectorType === LectorType.professor);
      })
    );
  } 
  getAlllibrarians(): Observable<Lector[]> {
    return this.http.get<Lector[]>('http://localhost:8060/api/lector/lectors').pipe(
      map((users: Lector[]) => {
        return users.filter(user => user.lectorType === LectorType.librarian);
      })
    );
  } 
  createUsers(users: Lector[]): Observable<Lector[]> {
    return this.http.post<Lector[]>('http://localhost:8060/api/lector/addlist', users);
  }
  
}