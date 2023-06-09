import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
import { Collection } from 'src/app/models/collection.model';
import { SubCollection } from 'src/app/models/subCollection.model';
import { SubCollectionService } from 'src/app/services/subCollection.service';
import { HttpClient } from '@angular/common/http';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EditorService } from 'src/app/services/editor.service';
import { Language } from 'src/app/models/language.model';
import { LanguageService } from 'src/app/services/language.service';
import { Country } from 'src/app/models/country.model';
import { CountryService } from 'src/app/services/country.service';
import { DocFormatService } from 'src/app/services/docFormat.service';
import { DocFormat } from 'src/app/models/docFormat.model';
import { DocCategoryService } from 'src/app/services/docCategory.service';
import { DocCategory } from 'src/app/models/docCategory.model';
import { DocStatuService } from 'src/app/services/docStatus.service';
import { DocStatus } from 'src/app/models/docStatus.model';

//import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  title = 'autocomplete';
  book:Book=new Book();
  selectedFile: File | null = null;
  collections : Collection[] ;
  scollections : SubCollection[];
  languages : Language[];
  countries : Country[];
  docFormat : DocFormat[];
  docCategory : DocCategory[];
  docStatus : DocStatus[];
  public isUpdateActive: boolean = false;
  doc_id:number;
  scollOptions : SubCollection[];
  collOptions : Collection[];
  langOptions : Language[];
  countryOptions : Country[];
  formatOptions : DocFormat[];
  categoryOptions : DocCategory[];
  statusOptions : DocStatus[];
  filterScollections : SubCollection[];
  filterCollections : Collection[];
  filterLanguages : Language[];
  filterCountries : Country[];
  filterFormat : DocFormat[];
  filterCategory : DocCategory[];
  filterStatus : DocStatus[];
  selectedSubCollections = new FormControl([]);
    constructor(private dialogService:DialogService ,private http: HttpClient ,private  fb: FormBuilder, private bookService:BookService, private langService : LanguageService, private countryService : CountryService
      , private collcService:CollectionService, private scollcService:SubCollectionService , private editorService : EditorService, private docFormatService : DocFormatService, private docCatService : DocCategoryService,
      private docStatuService : DocStatuService, private route:ActivatedRoute , private router: Router) { 
      
  }
  
  
  bookRegistrationForm!: FormGroup;
  collectionRegistrationForm!: FormGroup;
  subCollectionRegistrationForm!: FormGroup;
  categoryRegistrationForm!: FormGroup;
  editorList: Editor[] = [];
  dropdownList: Editor[] = [];
  dropdownSettings: any = {};
  

  ngOnInit(): void {
    
   
    this.bookRegistrationForm = this.fb.group({
      //doc_id:['',Validators.required],
      doc_id:[''],
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
      scol_id: [''],
      col_id: [''],
      lang_id:[''],
      cntr_id:[''],
      docFrm_id:[''],
      docCat_id:[''],
      docStat_id:[''],
      edt_id: [[]]
      
      
    }); 
    this.collectionRegistrationForm = this.fb.group({
      col_id: [''],
      col_title: [''],
      col_parallelTitle: [''],
      col_complementaryTitle: [''],
      col_responsability: [''],
      col_issn: ['']

    });
    this.subCollectionRegistrationForm = this.fb.group({
      scol_id: [''],
      scol_title: [''],
      scol_parallelTitle: [''],
      scol_complementaryTitle: [''],
      scol_responsability: [''],
      scol_issn: ['']

    });
    this.categoryRegistrationForm = this.fb.group({
      docCat_label: ['']
    });
    this.loadEditors(); // Load the editors initially
     
    this.configureDropdownSettings(); // Configure ng-multiselect-dropdown settings
    //load collections
    this.collcService.getAllCollections().subscribe(collc=>{
      this.collections=collc;
     });
     //load subcollections
    this.scollcService.getAllSubCollections().subscribe(scollc=>{
      this.scollections=scollc;
     });
     //load languages
    this.langService.getAllLanguages().subscribe(lang=>{
      this.languages=lang;
     });
     //load Countries
    this.countryService.getAllCountries().subscribe(country=>{
      this.countries=country;
     });
     //load doc format
    this.docFormatService.getAllDocFormat().subscribe(doc=>{
      this.docFormat=doc;
     });
     //load doc category
    this.docCatService.getAllDocCategories().subscribe(doc=>{
      this.docCategory=doc;
     });
     //load doc status
    this.docStatuService.getAllDocStatus().subscribe(doc=>{
      this.docStatus=doc;
     });

     this.initform();
     this.getNames();
     

  }

  loadEditors() {
    this.editorService.getAllEditors().subscribe((editor) => {
      this.editorList = editor;
      this.dropdownList = editor;
      console.log(this.editorList); // Check the values in the console
    });
  
  }
  
  configureDropdownSettings() {
    this.dropdownSettings = {
      singleSelection: false, // Allow selecting multiple items
      idField: 'edt_id',
      textField: 'edt_name',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }
  onItemSelect(item: any) {
    const selectedIds = this.bookRegistrationForm.value.edt_id;
    const selectedValues = selectedIds.map((id: any) => id.edt_id);
    console.log(selectedValues);
  }
  
  onSelectAll(items: any) {
    const selectedValues = items.map((item: any) => item.edt_id);
    console.log(selectedValues);
  } 
  
  initform(){
    this.bookRegistrationForm.get('scol_id').valueChanges.subscribe(res =>{
      this.filterData(res);
    });
    
    this.bookRegistrationForm.get('col_id').valueChanges.subscribe(res =>{
      this.filterData(res);
    });

    this.bookRegistrationForm.get('lang_id').valueChanges.subscribe(res =>{
      this.filterData(res);
    });

    this.bookRegistrationForm.get('cntr_id').valueChanges.subscribe(res =>{
      this.filterData(res);
    });
    this.bookRegistrationForm.get('docFrm_id').valueChanges.subscribe(res =>{
      this.filterData(res);
    });
    this.bookRegistrationForm.get('docCat_id').valueChanges.subscribe(res =>{
      this.filterData(res);
    });
    this.bookRegistrationForm.get('docStat_id').valueChanges.subscribe(res =>{
      this.filterData(res);
    });
  }
  
  filterData(enteredData) {
    const enteredSubcollection = this.bookRegistrationForm.get('scol_id').value;
    const enteredCollection = this.bookRegistrationForm.get('col_id').value;
    const enteredLanguage = this.bookRegistrationForm.get('lang_id').value;
    const enteredCountry = this.bookRegistrationForm.get('cntr_id').value;
    const enteredFormat = this.bookRegistrationForm.get('docFrm_id').value;
    const enteredCategory = this.bookRegistrationForm.get('docCat_id').value;
    const enteredStatus = this.bookRegistrationForm.get('docStat_id').value;
    if (typeof enteredData === 'string') {
    this.filterScollections = this.scollOptions.filter(item => {
      
      return item.scol_title.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
    });
    }else {
      this.filterScollections = this.scollOptions;
    }
    if (typeof enteredData === 'string') {
    this.filterCollections = this.collOptions.filter(item => {
      
      return item.col_title.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
    });
    }else {
    this.filterCollections = this.collOptions;
    }
    if (typeof enteredData === 'string') {
      this.filterLanguages = this.langOptions.filter(item => {
        
        return item.lang_label.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
      });
      }else {
      this.filterLanguages = this.langOptions;
      }
      if (typeof enteredData === 'string') {
        this.filterCountries = this.countryOptions.filter(item => {
          
          return item.cntr_name.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
        });
        }else {
        this.filterCountries = this.countryOptions;
        }
      if (typeof enteredData === 'string') {
        this.filterFormat = this.formatOptions.filter(item => {
          
          return item.docFrm_label.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
        });
        }else {
        this.filterFormat = this.formatOptions;
        }
      if (typeof enteredData === 'string') {
        this.filterCategory = this.categoryOptions.filter(item => {
          
          return item.docCat_label.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
        });
        }else {
        this.filterCategory = this.categoryOptions;
        }
      if (typeof enteredData === 'string') {
        this.filterStatus = this.statusOptions.filter(item => {
          
          return item.docStat_label.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
        });
        }else {
        this.filterStatus = this.statusOptions;
        }
  }
  
  getNames(){
    this.scollcService.getAllSubCollections().subscribe(response => {
      this.scollOptions = response;
      this.filterScollections = response;
    });
    
    this.collcService.getAllCollections().subscribe(response => {
      this.collOptions = response;
      this.filterCollections = response;
    });
    this.langService.getAllLanguages().subscribe(response => {
      this.langOptions = response;
      this.filterLanguages = response;
    });
    this.countryService.getAllCountries().subscribe(response => {
      this.countryOptions = response;
      this.filterCountries = response;
    });
    this.docFormatService.getAllDocFormat().subscribe(response => {
      this.formatOptions = response;
      this.filterFormat = response;
    });
    this.docCatService.getAllDocCategories().subscribe(response => {
      this.categoryOptions = response;
      this.filterCategory = response;
    });
    this.docStatuService.getAllDocStatus().subscribe(response => {
      this.statusOptions = response;
      this.filterStatus = response;
    });
  }
  
  deleteEditor(id: number) {
    this.bookService.deleteEditor(id).subscribe(
      () => console.log(`Editor with ID ${id} deleted successfully.`),
      error => console.error(error)
    );
  }
  
  submit(formType: string) {
    if (formType === 'bookRegistrationForm') {
      const formData = this.bookRegistrationForm.value;
      formData.edt_id = formData.edt_id.map((item: any) => item.edt_id);

      this.bookService.saveBook(formData)
      .subscribe(res => {

      });  
    } else if (formType === 'collectionRegistrationForm'){
       this.collcService.saveCollection(this.collectionRegistrationForm.value).subscribe(res => {

       });  
    } else if (formType === 'subCollectionRegistrationForm'){
      this.scollcService.saveSubCollection(this.subCollectionRegistrationForm.value).subscribe(res => {

      });  
   } else if (formType === 'categoryRegistrationForm'){
    this.docCatService.saveDocCategory(this.categoryRegistrationForm.value).subscribe(res => {

    });  }

     
  } 
  
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
 

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e: any) => {
      const fileContent = e.target.result;
      this.extractData(fileContent);
    };
  
    reader.readAsText(file);
  }


extractData(fileContent: string) {
  const encodingsToTry = ['utf-8', 'iso-8859-1', 'windows-1252'];

  let decodedContent = '';
  let encodingUsed = '';

  
  
  
  for (const encoding of encodingsToTry) {
    try {
      decodedContent = new TextDecoder(encoding).decode(new Uint8Array([...fileContent].map((char) => char.charCodeAt(0))));
      encodingUsed = encoding;
      break;
    } catch (error) {
      console.log(`Error decoding content with encoding ${encoding}: ${error}`);
    }
  } 

  console.log(`Decoded content using encoding ${encodingUsed}: ${decodedContent}`);

  // Define regular expressions for each field
  const regexPatterns = {
    doc_title: /titres\s*:\s*(.*)/,
    auteur: /auteurs\s*:\s*(.*)/,
    editor: /éditeurs\s*:\s*([\s\S]*?)(?=\n\w+\s*:|$|\n\n|\n$)/,
    '�diteurs': /�diteurs\s*:\s*([\s\S]*?)(?=\n\w+\s*:|$|\n\n|\n$)/,
    scol_id: /collections\s*:\s*(.*)/,
    sujets: /sujets\s*:\s*(.*)/,
    bk_isbn: /ISBN\s*:\s*(.*)/,
    collation: /collation\s*:\s*(.*)/,
    doc_abstract: /resumé\s*:\s*([\s\S]+?)(?=\n\w+\s*:|$|\n\n|\n$)/,
    'resum�': /resum�\s*:\s*([\s\S]+?)(?=\n\w+\s*:|$|\n\n|\n$)/,
  };

  // Extract the desired fields
  const extractedData: { [key: string]: string } = {};
  for (const field in regexPatterns) {
    if (regexPatterns.hasOwnProperty(field)) {
      const pattern = regexPatterns[field];
      const match = decodedContent.match(pattern);
      if (match) {
        let fieldValue = match[1].trim();
        fieldValue = fieldValue
          .replace(/[\u2018\u2019]/g, "'")
          .replace(/[\u201C\u201D]/g, '"')
          .replace(/[\u2013\u2014]/g, '-')
          .replace(/�/g, 'é')
          .replace(/à/g, 'à')
          .replace(/&eacute;/g, 'é')
          .replace(/&agrave;/g, 'à');

        if (field === 'collation') {
          const collationValue = match[1];
          const [pages, length] = collationValue.split(',').map((value) => value.trim());
          extractedData['doc_nbr_pages'] = pages.split(' ')[0] || '';
          extractedData['doc_length'] = length.split(' ')[0] || '';
        } else if (field === '�diteurs') {
          extractedData['editeurs'] = fieldValue;
        } else if (field === 'resum�') {
          extractedData['doc_abstract'] = fieldValue;
        }else {
          extractedData[field] = fieldValue;
        }
      }
      
    }
  }
  
  // Print the extracted data
  for (const field in extractedData) {
    if (extractedData.hasOwnProperty(field)) {
      console.log(`${field}: ${extractedData[field]}`);
    }
  }

  // Set the extracted data to the form controls
  this.bookRegistrationForm.patchValue(extractedData);
}

  clearForm(){
    this.bookRegistrationForm.reset();
}
  
}


