import { Component, OnInit } from '@angular/core';
import { WindService } from '../wind.service';
import {SolarService} from '../solar.service';

@Component({
  selector: 'app-wind',
  templateUrl: './wind.component.html',
  styleUrls: ['./wind.component.css']
})
export class WindComponent implements OnInit {

  svgTurbine = './assets/images/TurbineTop.svg';
  svgTower = './assets/images/Tower.svg';
  constructor(private windService: WindService) { }

  wData = {};

  ngOnInit() {
    this.windService.getLatestWind();
    this.windService.windData.subscribe((data) => {
      this.wData = data;
    });
  }

}
