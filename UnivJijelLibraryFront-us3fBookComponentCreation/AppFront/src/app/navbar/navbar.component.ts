import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  translatedText: string;
  subLibrary : string;
  
  selectedLanguage: string;

  constructor(private translate : TranslateService) {
    
  }
  public selectLanguage(event:any){
    this.translate.use(event.target.value);
  }

 
}
