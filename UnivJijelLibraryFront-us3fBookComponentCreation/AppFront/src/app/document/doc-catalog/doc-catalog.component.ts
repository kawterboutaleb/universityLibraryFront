import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogPosition, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { DialogService } from 'src/app/services/dialog.service';
import { DocumentService } from 'src/app/services/document.service';
import { TabService } from 'src/app/services/tab.service';
import { Document } from '../../models/document.model';

@Component({
  selector: 'app-doc-catalog',
  templateUrl: './doc-catalog.component.html',
  styleUrls: ['./doc-catalog.component.css']
})
export class DocCatalogComponent implements OnInit {

  clickedRows = new Set<Document>();
  displayedColumns: string[] = ['doc_id', 'doc_title', 'doc_complementaryTitle', 'doc_parallelTitle', 'doc_setTitle', 'doc_partNumber', 'doc_year', 'doc_nbr_copies', 'doc_keywords', 'doc_illustration',
  'doc_nbr_pages', 'doc_material', 'doc_length', 'doc_abstract','doc_notes'];
  docsList: Document[] = [];
  dataSource: MatTableDataSource<Document> = new MatTableDataSource<Document>(this.docsList);

column:string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(private dialogService:DialogService , private docService: DocumentService, private tabService:TabService, private router:Router, private activeRoute:ActivatedRoute) { }



  ngOnInit(): void {

    this.docService.getDocuments().subscribe(
      docs => {
        this.docsList = docs;
        this.dataSource.data = this.docsList;
        this.dataSource.filterPredicate= (data:any, filter:string)=>{
          const columnToFilter= data[this.column]||'';
          return columnToFilter.trim().toLowerCase().indexOf(filter) !==-1;
        };
       
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
    


  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  selection = new SelectionModel<Document>(true, []);

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
  
  
  public redirectToDetails(doc: Document) {
    
    this.dialogService.openDocDetailDialog(doc);

  }
  

  public redirectToUpdate (docId: string) {
    this.openTab('/document/edit/',docId);
  }
  async  redirectToDelete(docId: number){

    const result = await this.dialogService.openDeleteDialog(docId,'document');
   if(result==='delete')
   {

    this.docService.deleteDocument(docId).subscribe(
      data=>{
        for( var i = 0; i < this.docsList.length; i++){ 
          if ( this.docsList[i].doc_id === docId) {
              this.docsList.splice(i, 1); 
          }
        }
        this.dataSource.data = this.docsList;

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



