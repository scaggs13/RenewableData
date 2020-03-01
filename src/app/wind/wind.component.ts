import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wind',
  templateUrl: './wind.component.html',
  styleUrls: ['./wind.component.css']
})
export class WindComponent implements OnInit {
  message = {};
  constructor() { }

  getMessage() {
  }
  ngOnInit() {
    this.getMessage();
  }

}
