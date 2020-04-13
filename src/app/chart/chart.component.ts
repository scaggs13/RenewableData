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
          // Todo: convert timestamp to a date value
          callback(value, index, values) {
            const date = new Date(value * 1000);
            return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
          },
        }
      }]
    }
  };
  private myDataTypes = [];
  public myChartLabels = [0, 5];
  public myChartType = 'scatter';
  public myChartLegend = true;
  public sortedData = {};

  public myChartData = [
     {data: [{x: 0, y: 1}, {x: 1, y: 3}, {x: 2, y: 2}, {x: 3, y: 5}, {x: 4, y: 0}, {x: 5, y: 2}], label: 'Series A', showLine: true}
  ];
  public rawData;

  myChartColors = [
    {
      backgroundColor: 'rgba(103,58,183,0.1)',
      borderColor: 'rgb(103, 58, 183)',
      pointBackgroundColor: 'rgb(103, 58, 183)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
    },
    {
      backgroundColor: 'rgba(250,255,57,0.1)',
      borderColor: 'rgb(255,244,47)',
      pointBackgroundColor: 'rgb(250,255,57)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,244,47,0.8)'
    },
    {
      backgroundColor: 'rgba(39,202,255,0.1)',
      borderColor: 'rgb(56,174,255)',
      pointBackgroundColor: 'rgb(42,92,255)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(15,28,255,0.8)'
    },
    // ...colors for additional data sets
  ];

  constructor() { }

  ngOnInit() {
  }

  setChart(chartInfo) {
    this.myChartType = chartInfo.type;
    this.myDataTypes = chartInfo.dataTypes;
    // todo: set default axes, x + y for each data type
    this.rawData = chartInfo.rawData['0'].Items;
    // console.log(this.rawData['0']);
    // todo: Sort Data
    this.sortData();
    this.resetChartData();
    this.myChartLabels = [chartInfo.start, chartInfo.end];
    console.log(this.myChartData);
  }

  sortData() {
    // todo: take raw data and the set axis types then sort into the usable chart format into myChartData.
    let data = [];
    // for data int data types
    this.myDataTypes.forEach((item, index) => {
      console.log(item);
      // for data that equals data type in raw data
      for (const raw in this.rawData) {
        // select x and y values
        if (this.rawData[raw].DataType.S === item.name) {
          data.push(this.rawData[raw]);
        }
      }
      this.sortedData[item.name] = data;
      console.log(this.sortedData);
      data = [];
    });
  }

  resetChartData() {
    this.myChartData = [];
    let dat = [];
    this.myDataTypes.forEach((item, index) => {
      if (item.name === 'Solar') {
        for (const d in this.sortedData[item.name]) {
          dat.push({x: this.sortedData[item.name][d][item.x].N, y: JSON.parse(this.sortedData[item.name][d][item.y_ref].S)[item.y]});
        }
      } else {
        for (const d in this.sortedData[item.name]) {
          dat.push({x: this.sortedData[item.name][d][item.x].N, y: this.sortedData[item.name][d][item.y].N});
        }
      }
      dat.sort((a, b) => {
        if (a.x > b.x) {
          return 1;
        }
        if (a.x < b.x) {
          return -1;
        }
        return 0;
      });
      this.myChartData.push({data: dat, label: item.name, showLine: true});
      dat = [];
    });
    // Chart data . push
    // form: {data: [{x: , y:}, .... ], label: 'Series name', showLine: true}
  }

}
