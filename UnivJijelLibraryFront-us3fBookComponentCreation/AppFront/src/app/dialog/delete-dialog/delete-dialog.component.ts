import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

    //form: FormGroup;
    description:string;
    id:number;
    type:string;

    constructor(
        private dialogRef: MatDialogRef<DeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
          this.id=data.id;
          this.type=data.type;
        this.description = data.description;
    }

    ngOnInit() {
       /* this.form = this.fb.group({
            description: [this.description, []]
        });*/
    }

    save() {
     
        //this.dialogRef.close(this.form.value);
        this.dialogRef.close('delete');
    }

    close() {
      
        this.dialogRef.close();
    }

}
