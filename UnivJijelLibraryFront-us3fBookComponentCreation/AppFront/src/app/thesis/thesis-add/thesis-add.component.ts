import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params , Router} from '@angular/router';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Thesis } from 'src/app/models/thesis.model';
import { ThesisService } from 'src/app/services/thesis.service';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-thesis-add',
  templateUrl: './thesis-add.component.html',
  styleUrls: ['./thesis-add.component.css']
})
export class ThesisAddComponent implements OnInit {
  thesis:Thesis=new Thesis();
  titleSaveOrUpdate:string="Add";
  id:number;

  private thesisIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(private  fb: FormBuilder, private thesisService:ThesisService ,private route:ActivatedRoute , private router: Router) { 

  }

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  registrationForm!: FormGroup;


  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      doc_title: [''],
      doc_complementaryTitle: [''],
      doc_parallelTitle: [''],
      doc_setTitle: [''],
      ts_defencePlace: [''],
      ts_url: [''],
      doc_partNumber: [''],
      doc_year: [''],
      doc_nbr_copies: [''],
      doc_keywords: [''],
      doc_illustration: [''],
      doc_nbr_pages: [''],
      doc_material: [''],
      doc_length: [''],
      doc_abstract: [''],
      doc_notes: ['']
    });
 
  this.route.params.subscribe(val => {
    this.thesisIdToUpdate = val['doc_id'];
    if (this.thesisIdToUpdate) {
      this.isUpdateActive = true;
      this.thesisService.getThesisByID(this.thesisIdToUpdate)
        .subscribe({
          next: (res) => {
            this.fillFormToUpdate(res);
          },
          error: (err) => {
            console.log(err);
          }
        })
    }
  })
  

  
}
submit() {
  
  this.thesisService.createThesis(this.registrationForm.value)
    .subscribe(res => {

      this.registrationForm.reset();
    });
}
fillFormToUpdate(thesis: Thesis) {
  this.registrationForm.setValue({
    doc_title: thesis.doc_title,
    doc_complementaryTitle: thesis.doc_complementaryTitle,
    doc_parallelTitle: thesis.doc_parallelTitle,
    doc_setTitle: thesis.doc_setTitle,
    ts_defencePlace:thesis.ts_defencePlace,
    ts_url:thesis.ts_url,
    doc_partNumber: thesis.doc_partNumber,
    doc_year: thesis.doc_year,
    doc_nbr_copies: thesis.doc_nbr_copies,
    doc_keywords: thesis.doc_keywords,
    doc_illustration: thesis.doc_illustration,
    doc_nbr_pages: thesis.doc_nbr_pages,
    doc_material: thesis.doc_material,
    doc_length: thesis.doc_length,
    doc_abstract: thesis.doc_abstract,
    doc_notes: thesis.doc_notes
  })
}

update() {
  this.thesisService.updateThesis(this.registrationForm.value, this.thesisIdToUpdate)
    .subscribe(res => {

      this.registrationForm.reset();
    });
}
clearForm(){
  this.registrationForm.reset();
}

}
