import { Component, EventEmitter,Output, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
 

  
  constructor(private router: Router){}
  
  ngOnInit() {
  }

  /*@Output() goLogin: EventEmitter<boolean> = new EventEmitter<boolean>();

  goLog() {
    this.goLogin.emit(true);
   
  }*/
}