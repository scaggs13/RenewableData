import { Component, OnInit } from '@angular/core';
import { HistoricalDataService } from '../historical-data.service';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor(private histService: HistoricalDataService) { }

  ngOnInit() {}

}
