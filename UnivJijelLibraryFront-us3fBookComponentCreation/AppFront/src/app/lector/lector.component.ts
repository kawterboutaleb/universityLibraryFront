
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder } from '@angular/forms';
import * as XLSX from 'xlsx';
import { TabService } from '../services/tab.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';

import { SelectionModel } from '@angular/cdk/collections';
import { Lector } from '../models/lector.model';
import { LectorService } from '../services/lector.service';




@Component({

  selector: 'app-lector',

  templateUrl: './lector.component.html',

  styleUrls: ['./lector.component.css']

})

export class LectorComponent implements OnInit {
  selectedFile: File;

  clickedRows = new Set<Lector>();
  
  displayedColumns: string[] = ['select','lct_matricule', 'lct_firstName', 'lct_lastName', 'lct_email',

   'lectorType','details', 'update', 'delete'];

  lectorsList: Lector[] = [];

  dataSource: MatTableDataSource<Lector> = new MatTableDataSource<Lector>(this.lectorsList);

  column:string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  lector :Lector=new Lector();

  id:number;

  //registrationForm!: FormGroup;

  private bookIdToUpdate!: number;

  private _dialog: any;

  filterByISBN: string;

  filterByTitle: string;

  //updateForm: FormGroup;

constructor(private  fb: FormBuilder , private lectorService: LectorService, private tabService:TabService, private router:Router, private activeRoute:ActivatedRoute ,private modalService: NgbModal) { 

    

  } 

  selectedOption: any;

  options = [

    { label: 'Student', color: '#FF0000', selected: false },

    { label: 'Professor', color: '#00FF00', selected: false },

    { label: 'Librarian', color: '#0000FF', selected: true }

  ];

  

  filteredData: any[];

  getChipColor(color: string): string {

    return 'custom-chip-' + color.replace('#', '');

  }

  




  ngOnInit(): void {

    

  }



selectOption(option : any) {

    this.lectorService.getAllStudents().subscribe(

      lectors => {

        this.lectorsList = lectors;

        this.dataSource.data = this.lectorsList;

        this.dataSource.filterPredicate = (data: any, filter: string) => {

          const columnToFilter = data[this.column] || '';

          return columnToFilter.trim().toLowerCase().indexOf(filter) !== -1;

        };

        this.filteredData = this.lectorsList; // Add this line to set filteredData initially

        

        // Add the code to update filteredData based on selectedOption

        if (this.selectedOption) {

          this.filteredData = this.lectorsList.filter((data: any) => data.lectorType === this.selectedOption.label);

        }

      },

      (error: HttpErrorResponse) => {

        alert(error.message);

      }

    );




  }


applyFilter(event: Event, column: string){

    this.column=column;

    this.dataSource.filter= (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();

    if(this.dataSource.paginator){

      this.dataSource.paginator.firstPage();

    }

  }  





  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;

  }




  selection = new SelectionModel<Lector>(true, []);




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





  openTab(url: string, id:string) {

    this.tabService.addTab(url, id);

    this.tabService.activeTabUrl=url;

    if(id!=null){

      url=url+id

    }

    this.router.navigateByUrl(url);

  }




  

  onFileChange(event: any): void {

    this.selectedFile = event.target.files[0];

  }

processFile(): void {

    const fileReader = new FileReader();

    fileReader.onload = (e: any) => {

      const arrayBuffer: any = e.target.result;

      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      console.log(jsonData); // Do something with the extracted data

  

      // Convert jsonData to an array of Lector objects

      const lectors: Lector[] = jsonData.map((data: any) => ({

        lct_matricule: data.lct_matricule,

        lct_firstName: data.lct_firstName,

        lct_lastName: data.lct_lastName,

        lct_address: data.lct_address,

        lct_email: data.lct_email,

        lectorType: data.lectorType,

      }));

  

      // Call the createLectors service method and post the extracted data

      this.lectorService.createLectors(lectors).subscribe(

        (response) => {

          console.log('Lectors created:', response);

          // Optionally, perform any further actions after the Lectors are created

        },

        (error) => {

          console.error('Error creating Lectors:', error);

          // Optionally, handle the error or display an error message

        }

      );

    };

  

    fileReader.readAsArrayBuffer(this.selectedFile);

  }





}
