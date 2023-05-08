import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../dialog/delete-dialog/delete-dialog.component';
import { DetailDialogComponent } from '../dialog/detail-dialog/detail-dialog.component';
import { Book } from '../models/book.model';
import { Document } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog:MatDialog) { }

  async openDeleteDialog(id:number, type:string) : Promise<string>{
    //const dialogConfig = new MatDialogConfig();
    const dialogConfig: MatDialogConfig = {}; // if wwe have global configuration in app.module.ts we can't use the previous line.important to use this method.
    //dialogConfig.disableClose = true;
   



    dialogConfig.data = {
        id: id,
        type:type,
        title: 'Angular For Beginners'
    };

    
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
   
    return dialogRef.afterClosed()
    .toPromise()
    .then(data => {
      return Promise.resolve(data);
    });

  }

  openBookDetailDialog(book:Book){
    const dialogConfig : MatDialogConfig = {};

    dialogConfig.data={
      id : book.doc_id,
      title: book.doc_title,
      isbn: book.bk_isbn
    }
    this.dialog.open(DetailDialogComponent, dialogConfig);

  }
  openDocDetailDialog(doc:Document){
    const dialogConfig : MatDialogConfig = {};

    dialogConfig.data={
      id : doc.doc_id,
      title: doc.doc_title,
    }
    this.dialog.open(DetailDialogComponent, dialogConfig);

  }
}
