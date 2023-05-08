import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.css']
})
export class DetailDialogComponent implements OnInit {

  doc_id:number;
  doc_title:string;
  bk_isbn:string;

  constructor(
    private dialogRef:MatDialogRef<DetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.doc_id= data.doc_id;
    this.doc_title= data.doc_title;
    this.bk_isbn= data.bk_isbn;
    
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

}
