import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public myChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Y axis'
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback(value, index, values) {
            return '' + value;
          },
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'X axis'
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback(value, index, values) {
            return '' + value;
          },
        }
      }]
    }
  };

  public myChartLabels = [0, 5];
  public myChartType = 'scatter';
  public myChartLegend = true;

  public myChartData = [
    {data: [{x: 0, y: 1}, {x: 1, y: 3}, {x: 2, y: 2}, {x: 3, y: 5}, {x: 4, y: 0}, {x: 5, y: 2}], label: 'Series A', showLine: true}
  ];

  myChartColors = [
    {
      backgroundColor: 'rgba(103,58,183,0.1)',
      borderColor: 'rgb(103, 58, 183)',
      pointBackgroundColor: 'rgb(103, 58, 183)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
    },
    // ...colors for additional data sets
  ];

  constructor() { }

  ngOnInit() {
  }

}
