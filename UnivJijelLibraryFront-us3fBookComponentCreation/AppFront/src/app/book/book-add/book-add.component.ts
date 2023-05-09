import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { Category } from 'src/app/models/category.model';
import { BookService } from 'src/app/services/book.service';
//import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  book:Book=new Book();
  titleSaveOrUpdate:string="Add";
  id:number;
  
  categories:Category[];
  private bookIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(private  fb: FormBuilder, private bookService:BookService ,private route:ActivatedRoute , private router: Router) { 
  }
  registrationForm!: FormGroup;

  ngOnInit(): void {
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
    this.route.params.subscribe(val => {
      this.bookIdToUpdate = val['doc_id'];
      if (this.bookIdToUpdate) {
        this.isUpdateActive = true;
        this.bookService.getBook(this.bookIdToUpdate)
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
    
    this.bookService.saveBook(this.registrationForm.value)
      .subscribe(res => {
        this.registrationForm.reset();
      });
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
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id=params['doc_id'];
    });
    
    if(this.id==undefined){//add new book
      const formAddValues=JSON.parse(sessionStorage.getItem('formAddValues'));
      if(formAddValues){
        this.book.doc_id=formAddValues.doc_id;
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
    //load categories
    
     this.bookService.loadCategories().subscribe(categories=>{
      this.categories=categories;
     });
    
  }
  

  ngOnDestroy(){
    sessionStorage.setItem('formAddValues', JSON.stringify({
      isbn: this.book.doc_id}));
  }
  clearForm(addBookForm: NgForm){
    addBookForm.form.reset(); 
}
*/

/*
saveBook(addBookForm: NgForm){
  this.bookService.saveBook(this.book).subscribe(
    (book) => {
      // Handle successful response from service
      console.log("Book saved successfully!");
      addBookForm.form.reset(); 
    },
    (error) => {
      // Handle error response from service
      console.log("An error occurred while saving the book:", error);
    }
  );
}

saveBook(addBookForm: NgForm){
  this.bookService.saveBook(this.book).subscribe(book=>{
    
  });
  addBookForm.form.reset(); 


  
}

/*
  setLocalDateToDatePicker(book: Book){
    var localDate = new Date(book.releaseDate);
    if(localDate.getTimezoneOffset() < 0){
        localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset() );
    }else{
      localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset() );
    }
    book.releaseDate = localDate;
} */



}
