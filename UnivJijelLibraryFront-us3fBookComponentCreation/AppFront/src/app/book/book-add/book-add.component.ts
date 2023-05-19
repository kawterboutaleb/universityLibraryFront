import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { Category } from 'src/app/models/category.model';
import { Editor } from 'src/app/models/editor.model';
import { BookService } from 'src/app/services/book.service';

import { CollectionService } from 'src/app/services/collection.service';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { DialogService } from 'src/app/services/dialog.service';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { SubCollection } from 'src/app/models/subCollection.model';
import { SubCollectionService } from 'src/app/services/subCollection.service';





//import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  book:Book=new Book();
  //titleSaveOrUpdate:string="Add";
  id:number;
  selectedEditors: string[] = [];
  editors : Editor[];
 
  scollections : SubCollection[];
  private bookIdToUpdate!: number;
  public isUpdateActive: boolean = false; 
  filteredSuggestions: Observable<string[]>;
  myControl = new FormControl();
  editorCtrl = new FormControl();
  selected = [];
  
  constructor(private dialogService:DialogService ,private  fb: FormBuilder, private bookService:BookService, private collcService:CollectionService, private scollcService:SubCollectionService ,private route:ActivatedRoute , private router: Router) { 
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
      doc_notes: [''],
      collectionns : ['']
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
    //load editors
    this.bookService.getAllEditors().subscribe(editors=>{
      this.editors=editors;
     });

    

    //load sub collections
    this.scollcService.getAllSubCollections().subscribe(scollc=>{
      this.scollections=scollc;
     });

      this.filteredSuggestions = this.myControl.valueChanges.pipe(
    startWith(''), // Start with an empty string
    map(value => this.filterSuggestions(value)) // Map the input value to the filtered suggestions
  );
     
  }
  
  filterSuggestions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.editors.filter(editor => editor.edt_name.toLowerCase().includes(filterValue))
                       .map(editor => editor.edt_name);
  }

  deleteEditor(id: number) {
    this.bookService.deleteEditor(id).subscribe(
      () => console.log(`Editor with ID ${id} deleted successfully.`),
      error => console.error(error)
    );
  }
  submit() {
    
    this.bookService.saveBook(this.registrationForm.value)
      .subscribe(res => {

        this.registrationForm.reset();
      });
  }
  public redirectToDelate (edt_id: number) {
    this.bookService.deleteEditor(edt_id);
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
  
  }


