import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';


@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {

  book:Book=new Book();
  id:number;
  registrationForm!: FormGroup;
  private bookIdToUpdate!: number;
  /*
  constructor(private  fb: FormBuilder , private bookService:BookService ,private route:ActivatedRoute , private router: Router ) { 
  } */
  constructor(private fb: FormBuilder, private bookService: BookService, private route: ActivatedRoute, private router: Router) { 
    this.registrationForm = this.fb.group({
      bk_isbn: [''],
      doc_title: [''],
      bk_edition: [''],
      doc_complementaryTitle: [''],
      doc_parallelTitle: [''],
      doc_setTitle: [''],
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
      this.bookService.getBook(this.id).subscribe(result => { 
        if (result && result!=null){
          this.book=result;
          this.fillFormToUpdate(this.book);
          this.bookIdToUpdate = this.id; // set the bookIdToUpdate
          return;
        }
        console.log("no result");
      });
    }
  }
  fillFormToUpdate(book: Book) {
    this.registrationForm.setValue({
      bk_isbn: book.bk_isbn,
      doc_title: book.doc_title,
      bk_edition: book.bk_edition,
      doc_complementaryTitle: book.doc_complementaryTitle,
      doc_parallelTitle: book.doc_parallelTitle,
      doc_setTitle: book.doc_setTitle,
      doc_partNumber: book.doc_partNumber,
      doc_year: book.doc_year,
      doc_nbr_copies: book.doc_nbr_copies,
      doc_keywords: book.doc_keywords,
      doc_illustration: book.doc_illustration,
      doc_nbr_pages: book.doc_nbr_pages,
      doc_material: book.doc_material,
      doc_length: book.doc_length,
      doc_abstract: book.doc_abstract,
      doc_notes: book.doc_notes
    })
  }

  update() {
    this.bookService.updateBook(this.registrationForm.value, this.bookIdToUpdate)
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
