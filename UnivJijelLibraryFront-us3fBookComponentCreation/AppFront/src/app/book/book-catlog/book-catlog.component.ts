import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogPosition, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { DialogService } from 'src/app/services/dialog.service';
import { TabService } from 'src/app/services/tab.service';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';


@Component({
  selector: 'app-book-catlog',
  templateUrl: './book-catlog.component.html',
  styleUrls: ['./book-catlog.component.css']
})
export class BookCatlogComponent implements OnInit {

  clickedRows = new Set<Book>();
  /* displayedColumns: string[] = ['select','doc_id', 'bk_isbn', 'doc_title', 'bk_edition', 'doc_complementaryTitle', 'doc_parallelTitle', 'doc_setTitle',
   'doc_partNumber', 'doc_year', 'doc_nbr_copies','doc_keywords','doc_illustration','doc_nbr_pages','doc_material','doc_length','doc_abstract','doc_notes','details', 'update', 'delete']; */
  
  displayedColumns: string[] = ['select','doc_id', 'bk_isbn', 'doc_title', 'bk_edition',
   'doc_year','details', 'update', 'delete'];
  booksList: Book[] = [];
  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>(this.booksList);

column:string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  book:Book=new Book();
  id:number;
  registrationForm!: FormGroup;
  private bookIdToUpdate!: number;

  constructor(private  fb: FormBuilder,private dialogService:DialogService , private bookService: BookService, private tabService:TabService, private router:Router, private activeRoute:ActivatedRoute) { 
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



  ngOnInit(): void {

    this.activeRoute.params.subscribe((params:Params)=>{
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

    this.bookService.getAllBooks().subscribe(
      books => {
        this.booksList = books;
        this.dataSource.data = this.booksList;
        this.dataSource.filterPredicate= (data:any, filter:string)=>{
          const columnToFilter= data[this.column]||'';
          return columnToFilter.trim().toLowerCase().indexOf(filter) !==-1;
        };
       
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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
  

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  selection = new SelectionModel<Book>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }


  /*public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }*/

  applyFilter(event: Event, column: string){
    this.column=column;
    this.dataSource.filter= (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  public redirectToDetails(book: Book) {
    
    this.dialogService.openBookDetailDialog(book);

  }
  public redirectToUpdate (doc_id: string) {
    this.openTab('/book/edit/',doc_id);
    //this.openTab('/book/add',doc_id);
  }
  async  redirectToDelete(doc_id: number){

    const result = await this.dialogService.openDeleteDialog(doc_id,'book');
   if(result==='delete')
   {

    this.bookService.deleteBook(doc_id).subscribe(
      data=>{
        for( var i = 0; i < this.booksList.length; i++){ 
          if ( this.booksList[i].doc_id === doc_id) {
              this.booksList.splice(i, 1); 
          }
        }
        this.dataSource.data = this.booksList;

      }
    );
  }
  }

  openTab(url: string, id:string) {
    this.tabService.addTab(url, id);
    this.tabService.activeTabUrl=url;
    if(id!=null){
      url=url+id
    }
    this.router.navigateByUrl(url);
  }



  
}
 
