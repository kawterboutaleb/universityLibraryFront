import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-opac',
  templateUrl: './opac.component.html',
  styleUrls: ['./opac.component.css']
})
export class OpacComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

}
