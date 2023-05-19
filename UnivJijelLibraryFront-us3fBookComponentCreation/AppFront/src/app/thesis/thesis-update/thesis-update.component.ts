
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';
import { Thesis } from 'src/app/models/thesis.model';
import { ThesisService } from 'src/app/services/thesis.service';


@Component({
  selector: 'app-thesis-update',
  templateUrl: './thesis-update.component.html',
  styleUrls: ['./thesis-update.component.css']
})
export class ThesisUpdateComponent implements OnInit {

  thesis:Thesis=new Thesis();
  id:number;
  registrationForm!: FormGroup;
  private thesisIdToUpdate!: number;

  /*
  constructor(private  fb: FormBuilder , private bookService:BookService ,private route:ActivatedRoute , private router: Router ) { 
  } */
  constructor(private fb: FormBuilder, private thesisService: ThesisService, private route: ActivatedRoute, private router: Router) { 
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

  }
  /*
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
    });
    
    if(this.id==undefined){//add new book
      const formUpdateValues=JSON.parse(sessionStorage.getItem('formUpdateValues'));
      if(formUpdateValues){
        this.book.bk_isbn=formUpdateValues.isbn;
      }
    }else{//update existing book
      this.bookService.getBook(this.id).subscribe(
        result=>{ 
          if(result && result!=null){
          this.book=result;
          return;
          }
          console.log("no result");
        }
      );
    }
    
  } */
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
    });
  
    if(this.id==undefined){ // add new book
      // ...
    } else { // update existing book
      this.thesisService.getThesisByID(this.id).subscribe(result => { 
        if (result && result!=null){
          this.thesis=result;
          this.fillFormToUpdate(this.thesis);
          this.thesisIdToUpdate = this.id; // set the thesisIdToUpdate
          return;
        }
        console.log("no result");
      });
    }
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
  
  /*
  ngOnDestroy(){
    sessionStorage.setItem('formUpdateValues', JSON.stringify({
      isbn: this.book.bk_isbn}));
  }
  clearForm(updateBookForm: NgForm){
    updateBookForm.form.reset(); 
 }
  */
  /*
 updateBook(updateBookForm: NgForm){
    this.bookService.updateBook(this.book).subscribe(book=>{
    this.clearForm(updateBookForm);
    })
  } *


  setLocalDateToDatePicker(book: Book){
    var localDate = new Date(book.releaseDate);
    if(localDate.getTimezoneOffset() < 0){
        localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset() );
    }else{
      localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset() );
    }
    book.releaseDate = localDate;
}

*/


}
