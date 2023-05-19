import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';

import { Editor } from '../models/editor.model';


@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor(private http:HttpClient) {
   }

   public getAllEditors():Observable<Editor[]>{
      return this.http.get<Editor[]>('http://localhost:8060/api/editor/editors');
   }

   

   public saveEditor(editor:Editor){
      return this.http.post<Editor>('http://localhost:8060/api/editor/add', editor);
   }

   public getEditor(ID:number):Observable<Editor>{
    return this.http.get<Editor>(`http://localhost:8060/api/editor/editor/${ID}`);
 }
  
   public updateEditor(editor: Editor, ID: number) {
   return this.http.put<Editor>(`http://localhost:8060/api/editor/update/${ID}`, editor);
   }
   public deleteEditor(ID:number):Observable<void>{
    return this.http.delete<void>(`http://localhost:8060/api/editor/delete/${ID}`);
   }
   
}
