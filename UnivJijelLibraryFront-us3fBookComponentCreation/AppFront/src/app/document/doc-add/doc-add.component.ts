import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Document } from 'src/app/models/document.model';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-doc-add',
  templateUrl: './doc-add.component.html',
  styleUrls: ['./doc-add.component.css']
})
export class DocAddComponent implements OnInit {

  doc:Document=new Document();
  titleSaveOrUpdate:string="Add";
  id:number;
  


  constructor(private docService:DocumentService,private route:ActivatedRoute ) { 
  }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
    });
    
    if(this.id==undefined){//add new doc
      const formAddValues=JSON.parse(sessionStorage.getItem('formAddValues'));
      if(formAddValues){
        this.doc.doc_id=formAddValues.Doc_id;
      }
    }else{//update existing doc
      this.docService.getDocument(this.id).subscribe(
        result=>{ 
          if(result && result!=null){
          this.doc=result;
          return;
          }
          console.log("no result");
        }
      );
    }
    //load categories
    /*
     this.bookService.loadCategories().subscribe(categories=>{
      this.categories=categories;
     });
    */
  }
  

  ngOnDestroy(){
    sessionStorage.setItem('formAddValues', JSON.stringify({
      Doc_id: this.doc.doc_id}));
  }
  clearForm(addDocForm: NgForm){
    addDocForm.form.reset(); 
}

  /*
  createDocument(addDocForm: NgForm){
    this.docService.createDocument(this.doc).subscribe(this.doc=>{});
    addDocForm.form.reset();  

  
  } */
  
  createDocument(addDocForm: NgForm){
    this.docService.createDocument(this.doc).subscribe((doc: Document) => {
      // Do something with the created document
      console.log(doc);
    });
    addDocForm.form.reset();  
  }
 
  /*
  setLocalDateToDatePicker(doc: Document){
    var localDate = new Date(doc.releaseDate);
    if(localDate.getTimezoneOffset() < 0){
        localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset() );
    }else{
      localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset() );
    }
    book.releaseDate = localDate;
}  */


}



