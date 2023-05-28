import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { Editor } from 'src/app/models/editor.model';
import { BookService } from 'src/app/services/book.service';

import { CollectionService } from 'src/app/services/collection.service';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/models/collection.model';
import { SubCollection } from 'src/app/models/subCollection.model';
import { SubCollectionService } from 'src/app/services/subCollection.service';
import { HttpClient } from '@angular/common/http';

//import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})


export class BookAddComponent implements OnInit {
  book:Book=new Book();
  selectedFile: File | null = null;
  editors : Editor[];
  collections : Collection[] ;

  scollections : SubCollection[];
  private bookIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  myControl = new FormControl('');
  formControls: any;
  doc_id:number;
  subCollectionControl = new FormControl();
  filteredSubCollections: Observable<SubCollection[]>;
  //subCollections: SubCollection[] = []; 

  //subCollections: SubCollection[] = [{scol_id : null, scol_title:"",scol_parallelTitle:"",scol_complementaryTitle:"",scol_responsability:"",scol_issn:""}]; 

  
  constructor(private dialogService:DialogService ,private http: HttpClient ,private  fb: FormBuilder, private bookService:BookService, private collcService:CollectionService, private scollcService:SubCollectionService ,private route:ActivatedRoute , private router: Router) { 
    this.filteredSubCollections = this.subCollectionControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterSubCollections(value))
    );
  }

  filterSubCollections(value: string): SubCollection[] {
    const filterValue = value;
    return this.scollections.filter(subCollection => subCollection.scol_title.includes(filterValue));
  }
  registrationForm!: FormGroup;

  ngOnInit(): void {
    /*
    this.route.params.subscribe((params:Params)=>{
      this.doc_id=params['doc_id'];
    });
    
    if(this.doc_id==undefined){//add new book
      const formAddValues=JSON.parse(sessionStorage.getItem('formAddValues'));
      if(formAddValues){
        this.book.doc_id=formAddValues.doc_id;
      }
    }else{//update existing book
      this.bookService.getBook(this.doc_id).subscribe(
        result=>{ 
          if(result && result!=null){
          this.book=result;
          return;
          }
          console.log("no result");
        }
      );
    } */
    
    this.registrationForm = this.fb.group({
      doc_id:['',Validators.required],
      bk_isbn: ['',Validators.required],
      doc_title: ['',Validators.required],
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
      subCollectionTitle: ['']
      //subCollection: [null, Validators.required]
      //subCollection: new SubCollection()
    }); 
     
  
    /*
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
    }) */
    
    //load editors
    this.bookService.getAllEditors().subscribe(editors=>{
      this.editors=editors;
     });

    //load collections
    this.collcService.getAllCollections().subscribe(collc=>{
      this.collections=collc;
     });

    //load sub collections
    this.scollcService.getAllSubCollections().subscribe(scollections =>{
      //this.scollections.push.apply(this.scollections,result);
      this.scollections=scollections;
     });
     
    
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
  
  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.selectedFile as File);

    this.bookService.uploadFile( formData)
      .subscribe(
        (response) => {
          console.log('File uploaded successfully');
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
  } 

  deleteEditor(id: number) {
    this.bookService.deleteEditor(id).subscribe(
      () => console.log(`Editor with ID ${id} deleted successfully.`),
      error => console.error(error)
    );
  }
  
  submit() {
    console.log(this.registrationForm.value)
    
    this.bookService.saveBook(this.registrationForm.value)
      .subscribe(res => {

        this.registrationForm.reset();
      });  
  
    
  } /*
  saveBook(addBookForm: NgForm){
    this.bookService.saveBook(this.book).subscribe(book=>{
    });
    addBookForm.form.reset(); 
    
  }
 */
  public redirectToDelate (edt_id: number) {
    this.bookService.deleteEditor(edt_id);
  }
  /*
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
      doc_notes: book.doc_notes,
      subCollection: {
        scol_id: book.subCollection.scol_id
      }
    });
  } 
  update() {
    this.bookService.updateBook(this.registrationForm.value, this.bookIdToUpdate)
      .subscribe(res => {

        this.registrationForm.reset();
      });
  }  */
  
  clearForm(){
    this.registrationForm.reset();
}
  
}


