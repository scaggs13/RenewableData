import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wind',
  templateUrl: './wind.component.html',
  styleUrls: ['./wind.component.css']
})
export class WindComponent implements OnInit {
  message = {};
  svgTurbine = './assets/images/TurbineTop.svg';
  svgTower = './assets/images/Tower.svg';
  constructor() { }

  getMessage() {
  }
  ngOnInit() {
    this.getMessage();
  }

}
