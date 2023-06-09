import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';

import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) {
   }

   public getAllRoles():Observable<Role[]>{
      return this.http.get<Role[]>('http://localhost:8060/api/role/roles');
   }

   

   public saveRole(role:Role){
      return this.http.post<Role>('http://localhost:8060/api/role/add', role);
   }

   public getRole(ID:number):Observable<Role>{
    return this.http.get<Role>(`http://localhost:8060/api/role/role/${ID}`);
 }
  
   public updateRole(subColl: Role, ID: number) {
   return this.http.put<Role>(`http://localhost:8060/api/role/update/${ID}`, subColl);
   }
   public deleteRole(ID:number):Observable<void>{
    return this.http.delete<void>(`http://localhost:8060/api/role/delete/${ID}`);
   }
   
}