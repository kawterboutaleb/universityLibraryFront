import { Injectable, OnInit } from '@angular/core';
import { ITab } from '../models/ITab.model';

@Injectable({
  providedIn: 'root'
})
export class TabService{
  
  activeTabUrl;

  tabs:ITab[]=[];
  tabOptions:ITab[]=[
    {name:'Home', url:'/home', id: null},
    {name:'Book Catalog', url:'/book/catalog', id: null},
    {name:'doc Catalog', url:'/document/catalog', id: null},
    {name:'thesis Catalog', url:'/thesis/catalog', id: null},
    {name:'Book Add', url:'/book/add', id: null},
    {name:'Document Add', url:'/document/add', id: null},
    {name:'Book Update', url:'/book/edit/', id: null},
    {name:'doc Update', url:'/document/edit/', id: null},
    {name:'Dashboard', url:'/dashboard', id: null}
    
  ];
  constructor() { }
 

  addTab(url: string, id:string){
    
    this.activeTabUrl=url+id;
    if(id!=null){
      this.activeTabUrl+id;
    }
    const tab= this.getTabOptionByUrl(url);
    tab.id=id;
   if(!this.isOpenedTab(url)){// (!this.tabs.includes(tab)) {
    this.tabs.push(tab);
    sessionStorage.setItem('tabs',JSON.stringify(this.tabs));
    }
  }

  getTabWithUrl(url:string): ITab{
    return this.tabs.find(tab=> tab.url===url);

  }



  isOpenedTab(url: string): boolean{
    let tab= this.tabs.find(tab=> tab.url===url);
    if(tab){
      return true;
    }else{
      return false;
    }
  }
  getTabOptionByUrl(url: string): ITab{

    return this.tabOptions.find(tab=> tab.url===url);
  }

  deleteTab(index:number){
    this.tabs.splice(index,1);
  }
}
