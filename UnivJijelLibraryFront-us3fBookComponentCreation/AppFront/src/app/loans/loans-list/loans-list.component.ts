import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/services/dialog.service';
import { TabService } from 'src/app/services/tab.service';
import { FormGroup, FormControl,FormBuilder,Validators  } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Loans } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-loans-list',
  templateUrl: './loans-list.component.html',
  styleUrls: ['./loans-list.component.css']
})
export class LoansListComponent implements OnInit {

  clickedRows = new Set<Loans>();

  displayedColumns: string[] = ['select','lct_firstName', 'lct_lastName','doc_title', 'loanBeginDate', 'loanEndDate','details', 'update', 'delete'];
  loansList: Loans[] = [];
  dataSource: MatTableDataSource<Loans> = new MatTableDataSource<Loans>(this.loansList);
  column:string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  loans:Loans=new Loans();
  id:number;

  constructor(private  fb: FormBuilder, private loanService: LoanService,private dialogService:DialogService , private tabService:TabService, private router:Router, private activeRoute:ActivatedRoute ,private modalService: NgbModal) { 
    
  } 



  ngOnInit(): void {

    this.loanService.getLoans().subscribe(
      loans => {
        this.loansList = loans;
        this.dataSource.data = this.loansList;
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

  selection = new SelectionModel<Loans>(true, []);

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

}
