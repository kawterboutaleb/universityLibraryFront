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
import { FormGroup, FormControl,FormBuilder,Validators  } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-book-catlog',
  templateUrl: './book-catlog.component.html',
  styleUrls: ['./book-catlog.component.css']
})
export class BookCatlogComponent implements OnInit {

  clickedRows = new Set<Book>();

  displayedColumns: string[] = ['select','doc_id', 'bk_isbn', 'doc_title', 'bk_edition',
   'doc_year','details', 'update', 'delete'];
  booksList: Book[] = [];
  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>(this.booksList);
  column:string;
  selectedBook: Book | null = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  book:Book=new Book();
  id:number;
  registrationForm!: FormGroup;
  private bookIdToUpdate!: number;
  private _dialog: any;
  filterByISBN: string;
  filterByTitle: string;
  updateForm: FormGroup;

  constructor(private  fb: FormBuilder,private dialogService:DialogService , private bookService: BookService, private tabService:TabService, private router:Router, private activeRoute:ActivatedRoute ,private modalService: NgbModal) { 
    
  } 



  ngOnInit(): void {

    this.updateForm = this.fb.group({
      bk_isbn: ['', Validators.required],
      doc_title: ['', Validators.required],
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
    this.bookIdToUpdate = this.book.doc_id;
    /*
    this.dataSource.filterPredicate = (data: Book, filter: string) => {
      const filterObject = JSON.parse(filter);
      const isbnMatch = data.bk_isbn.toLowerCase().includes(filterObject.isbn);
      const titleMatch = data.doc_title.toLowerCase().includes(filterObject.title);
  
      return isbnMatch && titleMatch;
    };

    this.bookService.getAllBooks().subscribe(
      books => {
        this.booksList = books;
        this.dataSource.data = this.booksList;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
     */
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
  
 
  showBookDetails(book: Book) {
  this.selectedBook = book;
} 

  
  applyFilter(event: Event, column: string){
    this.column=column;
    this.dataSource.filter= (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }  
  /*
  applyFilter(event: Event, column: string) {
    const value = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();

    if (column === 'bk_isbn') {
      this.filterByISBN = value;
    } else if (column === 'doc_title') {
      this.filterByTitle = value;
    }
  
    this.dataSource.filter = JSON.stringify({
      isbn: this.filterByISBN,
      title: this.filterByTitle
    }); 
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } */
  
  /*
  applyFilter(event: Event, column: string) {
    const value = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  
    if (column === 'isbn') {
      this.filterByISBN = value;
    } else if (column === 'title') {
      this.filterByTitle = value;
    }
  
    this.dataSource.filter = JSON.stringify({
      isbn: this.filterByISBN,
      title: this.filterByTitle
    });
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } */
  
  
  
  edit(book: Book){
    this.book=book;
    this.bookIdToUpdate = book.doc_id;
  }

  updateBook(){
    
    
    this.bookService.updateBook(this.book,this.bookIdToUpdate).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);
      }
    );
    this.modalService.dismissAll();
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
 
