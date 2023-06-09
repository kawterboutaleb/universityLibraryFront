import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observer } from 'rxjs';
import { ITab } from 'src/app/models/ITab.model';
import { TabService } from 'src/app/services/tab.service';
import { UserService } from './services/user.service';
import { LoginComponent } from './user/login/login.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'AppFront';
  tabs:ITab[];
   activeTabUrl;
  
  
  
  constructor(public tabService:TabService, private router:Router,private userService:UserService,private loginComponent: LoginComponent){
    console.log("constructeur app")
  }
  
  isLoggedIn: boolean = false;
  handleLogin(loggedIn: boolean) {
    this.isLoggedIn = loggedIn;}

    
    

  ngOnInit(): void {
    
    

    const savedTabs = sessionStorage.getItem('tabs');
    this.tabs=savedTabs?JSON.parse(savedTabs): this.tabService.tabs;
    this.tabService.tabs=    this.tabs     ;
   
    let  activUrl=sessionStorage.getItem('activeUrl');
    if(activUrl){
      this.tabService.activeTabUrl =sessionStorage.getItem('activeUrl');
    }
    window.addEventListener("beforeunload", (event) => {
      sessionStorage.setItem('activeUrl',this.tabService.activeTabUrl);
    });
    /* this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.tabService.activeTabUrl = event.urlAfterRedirects;

       if (this.tabs.length === 0) {
          console.log(this.activeTabUrl);
          this.tabService.addTab(this.activeTabUrl);
        }
      }


    });*/
  

  }

  
  closeTab(index: number, event: Event) {
    if(this.tabs.length===1){
      //this.router.navigateByUrl(this.tabs[index+1].url);
    }else{
      let url;
    if(index<this.tabs.length-1)
    {
       url= this.tabs[index+1].url;
      
    }else{//if it is the last tab that we close
       url= this.tabs[index-1].url;      
    }
    let tab= this.tabService.getTabWithUrl(url);
    this.tabService.activeTabUrl = url;
      if (tab.id!=null){url= url+tab.id; }
      this.router.navigateByUrl(url);
    }
    
    this.tabService.deleteTab(index);
    event.preventDefault();
    event.stopImmediatePropagation();
    sessionStorage.setItem('tabs',JSON.stringify(this.tabs));

  }
  onTabChange(url) {
    //look after the opened  tab with this url in order to recuperate the necessary information for navigation
    //information such as id and the value of inputs, etc.
    this.tabService.activeTabUrl=url;

    let tab= this.tabService.getTabWithUrl(url);
    if(tab.id!=null){
      url=url+tab.id;
    }
    this.router.navigateByUrl(url);
    
   
  }
}
