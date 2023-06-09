import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import Scrollbar from "smooth-scrollbar";
import { TabService } from '../services/tab.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private tabService:TabService, private router:Router, private translateService: TranslateService) { }

  ngOnInit(): void {
    Scrollbar.init(document.querySelector("#sidebarContainer"));
  }

  openTab(url: string, id:string) {
    this.tabService.addTab(url, id);
    this.tabService.activeTabUrl=url;
    this.router.navigateByUrl(url);
  }




}
