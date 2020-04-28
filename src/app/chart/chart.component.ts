import { Component, OnInit } from '@angular/core';
import {DataComponent} from '../data/data.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public parentData: DataComponent;
  public index;

  public myDataTypes = [];
  private yAxisTicks = [];
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
          beginAtZero: true,
          // Include other axis if the value is scaled
          callback: (value, index, values) => {
            this.yAxisTicks = values;
            const scaleV = [];
            let returnValue = '' + value;
            for (const d in this.myDataTypes) {
              if (this.myDataTypes[d].scale !== 1) {
                scaleV.push(this.myDataTypes[d].scale);
              }
            }
            // tslint:disable-next-line:forin
            for (const v in scaleV) {
              returnValue = returnValue + ' (' + (value / scaleV[v]).toPrecision(4) + ')';
            }
            return returnValue;
          },
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'X axis'
        },
        ticks: {
          callback(value) {
            const date = new Date(value * 1000);
            return (date.getMonth() + 1) + '/' + date.getDate() + '/'
              + date.getFullYear() + '\n' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
          },
        }
      }]
    }
  };

  public myChartLabels = [0, 5];
  public myChartType = 'scatter';
  public myChartLegend = true;
  public sortedData = {};

  public myChartData = [
     {data: [{x: 0, y: 0}], label: 'No Data Available', showLine: false}
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

  removeTag(s: string) {
    return s.substring(s.indexOf(' ') + 1);
  }

  setScale(plot, value) {
    if (value) {
      // scale the plot
      // get Max value
      // (yAxisTicks[0])
      let maxV = 0;
      let selfMaxV = 0;
      for (const d in this.myChartData) {
        if (plot.y !== this.myChartData[d].label) {
          for (const v in this.myChartData[d].data) {
            if (this.myChartData[d].data[v].y > maxV) {
              maxV = this.myChartData[d].data[v].y;
            }
          }
        } else {
          for (const v in this.myChartData[d].data) {
            if (this.myChartData[d].data[v].y > selfMaxV) {
              selfMaxV = this.myChartData[d].data[v].y;
            }
          }
        }
      }
      plot.scale = maxV / selfMaxV;
    } else {
      // set scale to 1
      plot.scale = 1;
    }
    this.resetChartData();
  }

  setStartX(event) {
    const value = new Date(event).getTime() / 1000;
    if (value < this.myChartLabels[1]) {
      this.myChartLabels[0] = value;
      this.resetChartData();
    }
  }
  setEndX(event) {
    const value = new Date(event).getTime() / 1000;
    if (value > this.myChartLabels[0]) {
      this.myChartLabels[1] = value;
      this.resetChartData();
    }
  }

  setChart(chartInfo) {
    this.myChartType = chartInfo.type;
    this.myDataTypes = chartInfo.dataTypes;
    this.rawData = chartInfo.rawData;
    // console.log(this.rawData);
    this.myChartLabels = [chartInfo.start, chartInfo.end];
    this.sortData();
    // console.log(this.sortedData);
    this.resetChartData();
    // console.log(this.myChartData);
  }

  changeYAxis(plot, event) {
    if (plot.name === 'Solar') {
      if (event.toString().includes('Poly')) {
        plot.y_ref = 'Poly';
        plot.y = event.toString().replace(plot.y_ref + ': ', '');
      } else if (event.toString().includes('Mono')) {
        plot.y_ref = 'Mono';
        plot.y = event.toString().replace(plot.y_ref + ': ', '');
      } else if (event.toString().includes('Battery')) {
        plot.y_ref = 'Battery';
        plot.y = event.toString().replace(plot.y_ref + ': ', '');
      } else if (event.toString().includes('Inverter')) {
        plot.y_ref = 'Inverter';
        plot.y = event.toString().replace(plot.y_ref + ': ', '');
      } else if (event.toString().includes('ChargeM')) {
        plot.y = event.toString().replace('ChargeM: ', '');
        plot.y_ref = 'ChargeControllerM';
      } else if (event.toString().includes('ChargeP')) {
        plot.y = event.toString().replace('ChargeP: ', '');
        plot.y_ref = 'ChargeControllerP';
      }

    } else {
      plot.y = event.toString();
    }
    this.resetChartData();
  }

  sortData() {
    let data = [];
      // for data in data types
    this.myDataTypes.forEach((item) => {
        // for data that equals data type in raw data
        for (const raw in this.rawData) {
          // select x and y values
          if (this.rawData[raw].DataType.S === item.name) {
            if (item.name === 'Solar') {
              this.rawData[raw].Poly.S = JSON.parse(this.rawData[raw].Poly.S);
              this.rawData[raw].Mono.S = JSON.parse(this.rawData[raw].Mono.S);
              this.rawData[raw].Battery.S = JSON.parse(this.rawData[raw].Battery.S);
              this.rawData[raw].ChargeControllerM.S = JSON.parse(this.rawData[raw].ChargeControllerM.S);
              this.rawData[raw].ChargeControllerP.S = JSON.parse(this.rawData[raw].ChargeControllerP.S);
              this.rawData[raw].Inverter.S = JSON.parse(this.rawData[raw].Inverter.S);

            }
            data.push(this.rawData[raw]);
          }
        }
        this.sortedData[item.name] = {y_values: [], data: []};
        if (this.myChartType === 'bar') {
          const averages = [];
          // Change to average values
          // Get day of first timestamp.
          const range = [new Date(this.myChartLabels[0] * 1000).setHours(0, 0, 0, 0)
          , new Date(this.myChartLabels[1] * 1000).setHours(0, 0, 0, 0)];

          // loop through each day
          for (const d = new Date(range[0]); d <= new Date(range[1]); d.setDate(d.getDate() + 1)) {
           //  daysOfYear.push(new Date(d));
            const daily = [];
            const runningSum = 0;
            for (const value in data) {
              if (new Date(data[value].Timestamp.N * 1000).setHours(0, 0, 0,  0) === d.getTime()) {
                daily.push(data[value]);
              }
            }
            // Average daily value and push to whatever the data holding variable is.
            // Averaging will be different for the different datatypes.
          }

        }
        this.sortedData[item.name].data = data;
        // Add available y values
        this.addYs(data[0], item.name);
        data = [];
    });
  }

  addYs(data, name) {
    const values = [];
    if (name === 'Solar') {
      // tslint:disable-next-line:forin
      for (const keys in data.Poly.S) {
        values.push('Poly: ' + keys.toString());
      }
      // tslint:disable-next-line:forin
      for (const keys in data.Mono.S) {
        values.push('Mono: ' + keys.toString());
      }
      // tslint:disable-next-line:forin
      for (const keys in data.Battery.S) {
        values.push('Battery: ' + keys.toString());
      }
      // tslint:disable-next-line:forin
      for (const keys in data.ChargeControllerM.S) {
        values.push('ChargeM: ' + keys.toString());
      }
      // tslint:disable-next-line:forin
      for (const keys in data.ChargeControllerP.S) {
        values.push('ChargeP: ' + keys.toString());
      }
      // tslint:disable-next-line:forin
      for (const keys in data.Inverter.S) {
        values.push('Inverter: ' + keys.toString());
      }
    } else {
      for (const keys in data) {
        if (keys !== 'DataType' && keys !== 'timestamp' && keys !== 'Timestamp') {
          values.push(keys.toString());
        }
      }
    }
    this.sortedData[name].y_values = values;
  }

  addPlot(name) {
    switch (name) {
      case 'Solar':
        this.myDataTypes.push({name: 'Solar', x: 'Timestamp', y: 'PolyP1v', y_ref: 'Poly', scale: 1});
        break;
      case 'Weather':
        this.myDataTypes.push({name: 'Weather', x: 'Timestamp', y: 'air_temperature', scale: 1});
        break;
      case 'Wind' :
        this.myDataTypes.push({name: 'Wind', x: 'Timestamp', y: 'P31_V', scale: 1});
        break;
      default:
    }
    this.resetChartData();
  }

  resetChartData() {
    this.myChartData = [];
    let dat = [];
    this.myDataTypes.forEach((item) => {
      if (item.name === 'Solar') { // May need to do something like this for wind? depends on how the wind data is implemented
        // tslint:disable-next-line:forin
        for (const d in this.sortedData[item.name].data) {
          if (this.sortedData[item.name].data[d][item.x].N >= this.myChartLabels[0]
            && this.sortedData[item.name].data[d][item.x].N <= this.myChartLabels[1]) {
            dat.push({x: this.sortedData[item.name].data[d][item.x].N
              , y: this.sortedData[item.name].data[d][item.y_ref].S[item.y] * item.scale}); // Parse
          }
        }
      } else {
        // tslint:disable-next-line:forin
        for (const d in this.sortedData[item.name].data) {
          if (this.sortedData[item.name].data[d][item.x].N >= this.myChartLabels[0]
            && this.sortedData[item.name].data[d][item.x].N <= this.myChartLabels[1]) {
            dat.push({x: this.sortedData[item.name].data[d][item.x].N, y: this.sortedData[item.name].data[d][item.y].N * item.scale});
          }
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
      this.myChartData.push({data: dat, label: item.y, showLine: true});
      dat = [];
    });
    // form: {data: [{x: , y:}, .... ], label: 'Series name', showLine: true}
  }

  openPopUp(event) {
    if (event.target.className !== 'option') {
      event.target.getElementsByClassName('popup')[0].classList.toggle('show');
    } else {
      event.target.parentElement.classList.toggle('show');
    }
  }

  openChartSettings(event) {
    event.target.parentElement.getElementsByClassName('hideable-content')[0].classList.toggle('show');
  }

  getSortedData() {
    // const returnData = this.sortedData;
    // for (const d in returnData) {
    //   // if (d === 'Solar') {
    //   //   // tslint:disable-next-line:forin
    //   //   for (const item in returnData[d].data) {
    //   //     returnData[d].data[item].Poly.S = returnData[d].data[item].Poly.S; // Parse
    //   //     returnData[d].data[item].Mono.S = returnData[d].data[item].Mono.S; // Parse
    //   //   }
    //   // }
    // }
    return this.sortedData;
  }

  deletePlot(plot) {
    this.myDataTypes.splice(this.myDataTypes.indexOf(plot), 1);
    this.resetChartData();
  }

  deleteChart() {
    this.parentData.removeChart(this.index);
  }

}
