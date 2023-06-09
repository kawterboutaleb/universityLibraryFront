import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params , Router} from '@angular/router';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Thesis } from 'src/app/models/thesis.model';
import { ThesisService } from 'src/app/services/thesis.service';
import { Language } from 'src/app/models/language.model';
import { Country } from 'src/app/models/country.model';
import { DocFormat } from 'src/app/models/docFormat.model';
import { DocCategory } from 'src/app/models/docCategory.model';
import { DocStatus } from 'src/app/models/docStatus.model';
import { DocCategoryService } from 'src/app/services/docCategory.service';
import { DocFormatService } from 'src/app/services/docFormat.service';
import { CountryService } from 'src/app/services/country.service';
import { LanguageService } from 'src/app/services/language.service';
import { DocStatuService } from 'src/app/services/docStatus.service';
import { Speciality } from 'src/app/models/speciality.model';
import { SpecialityService } from 'src/app/services/speciality.service';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-thesis-add',
  templateUrl: './thesis-add.component.html',
  styleUrls: ['./thesis-add.component.css']
})
export class ThesisAddComponent implements OnInit {
  thesis:Thesis=new Thesis();
  titleSaveOrUpdate:string="Add";
  id:number;
  selectedFile: File | null = null;
  private thesisIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  languages : Language[];
  countries : Country[];
  docFormat : DocFormat[];
  docCategory : DocCategory[];
  docStatus : DocStatus[];
  speciality : Speciality[];
  langOptions : Language[];
  countryOptions : Country[];
  formatOptions : DocFormat[];
  categoryOptions : DocCategory[];
  statusOptions : DocStatus[];
  specialityOptions : Speciality[];
  filterLanguages : Language[];
  filterCountries : Country[];
  filterFormat : DocFormat[];
  filterCategory : DocCategory[];
  filterStatus : DocStatus[];
  filterSpeciality : Speciality[];
  constructor(private  fb: FormBuilder, private thesisService:ThesisService ,private route:ActivatedRoute ,
     private router: Router, private langService : LanguageService, private countryService : CountryService, private docFormatService : DocFormatService, private docCatService : DocCategoryService,
  private docStatuService : DocStatuService, private specialityService : SpecialityService) { 

  }

 

  thesisRegistrationForm!: FormGroup;
  categoryRegistrationForm!: FormGroup;
  specialityRegistrationForm!: FormGroup;

  ngOnInit(): void {
    this.thesisRegistrationForm = this.fb.group({
      doc_title: [''],
      doc_complementaryTitle: [''],
      doc_parallelTitle: [''],
      doc_setTitle: [''],
      ts_defencePlace: [''],
      ts_url: [''],
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
      lang_id:[''],
      cntr_id:[''],
      docFrm_id:[''],
      docCat_id:[''],
      docStat_id:[''],
      sp_id:['']
    });
    this.categoryRegistrationForm = this.fb.group({
      docCat_label: ['']
    });
    this.specialityRegistrationForm = this.fb.group({
      sp_label: ['']
    });
 
  this.route.params.subscribe(val => {
    this.thesisIdToUpdate = val['doc_id'];
    if (this.thesisIdToUpdate) {
      this.isUpdateActive = true;
      this.thesisService.getThesisByID(this.thesisIdToUpdate)
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
   //load speciality
  this.specialityService.getAllSpeciality().subscribe(doc=>{
    this.speciality=doc;
   });

   this.initform();
   this.getNames();

   
}

initform(){

  this.thesisRegistrationForm.get('lang_id').valueChanges.subscribe(res =>{
    this.filterData(res);
  });

  this.thesisRegistrationForm.get('cntr_id').valueChanges.subscribe(res =>{
    this.filterData(res);
  });
  this.thesisRegistrationForm.get('docFrm_id').valueChanges.subscribe(res =>{
    this.filterData(res);
  });
  this.thesisRegistrationForm.get('docCat_id').valueChanges.subscribe(res =>{
    this.filterData(res);
  });
  this.thesisRegistrationForm.get('docStat_id').valueChanges.subscribe(res =>{
    this.filterData(res);
  });
  this.thesisRegistrationForm.get('sp_id').valueChanges.subscribe(res =>{
    this.filterData(res);
  });
}

filterData(enteredData) {
  
  const enteredLanguage = this.thesisRegistrationForm.get('lang_id').value;
  const enteredCountry = this.thesisRegistrationForm.get('cntr_id').value;
  const enteredFormat = this.thesisRegistrationForm.get('docFrm_id').value;
  const enteredCategory = this.thesisRegistrationForm.get('docCat_id').value;
  const enteredStatus = this.thesisRegistrationForm.get('docStat_id').value;
  const enteredSpeciality = this.thesisRegistrationForm.get('sp_id').value;
  
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
    if (typeof enteredData === 'string') {
      this.filterSpeciality = this.specialityOptions.filter(item => {
          
        return item.sp_label.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
      });
      }else {
      this.filterSpeciality = this.specialityOptions;
      }
}

getNames(){
  
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
  this.specialityService.getAllSpeciality().subscribe(response => {
    this.specialityOptions = response;
    this.filterSpeciality = response;
  });
}

submit(formType: string) {
  if (formType === 'thesisRegistrationForm') {
    this.thesisService.createThesis(this.thesisRegistrationForm.value)
    .subscribe(res => {

    });    
 } else if (formType === 'categoryRegistrationForm'){
  this.docCatService.saveDocCategory(this.categoryRegistrationForm.value).subscribe(res => {

  });  
 } else if (formType === 'specialityRegistrationForm'){
  this.specialityService.saveSpeciality(this.specialityRegistrationForm.value).subscribe(res => {

  });  }

   
} 
fillFormToUpdate(thesis: Thesis) {
  this.thesisRegistrationForm.setValue({
    doc_title: thesis.doc_title,
    doc_complementaryTitle: thesis.doc_complementaryTitle,
    doc_parallelTitle: thesis.doc_parallelTitle,
    doc_setTitle: thesis.doc_setTitle,
    ts_defencePlace:thesis.ts_defencePlace,
    ts_url:thesis.ts_url,
    doc_partNumber: thesis.doc_partNumber,
    doc_year: thesis.doc_year,
    doc_nbr_copies: thesis.doc_nbr_copies,
    doc_keywords: thesis.doc_keywords,
    doc_illustration: thesis.doc_illustration,
    doc_nbr_pages: thesis.doc_nbr_pages,
    doc_material: thesis.doc_material,
    doc_length: thesis.doc_length,
    doc_abstract: thesis.doc_abstract,
    doc_notes: thesis.doc_notes
  })
}

update() {
  this.thesisService.updateThesis(this.thesisRegistrationForm.value, this.thesisIdToUpdate)
    .subscribe(res => {

      this.thesisRegistrationForm.reset();
    });
}
clearForm(){
  this.thesisRegistrationForm.reset();
}

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
this.thesisRegistrationForm.patchValue(extractedData);
}

}
