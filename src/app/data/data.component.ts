import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { HistoricalDataService } from '../historical-data.service';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  @ViewChild('chartContainer', {static: false, read: ViewContainerRef }) container;
  private componentRef: ComponentRef<ChartComponent>;
  private components = [];
  constructor(private histService: HistoricalDataService, private resolver: ComponentFactoryResolver) { }

  ngOnInit() {}

  addChart(formValues) {
    const factory: ComponentFactory<ChartComponent> = this.resolver.resolveComponentFactory(ChartComponent);
    this.componentRef = this.container.createComponent(factory);
    this.components.push(this.componentRef);
    const temp = {
      type: formValues.chartType, start: formValues.start, end: formValues.end
      , dataTypes: [], rawData: []}
    ;
    if (formValues.weather) {
      temp.dataTypes.push({name: 'Weather', x: 'Timestamp', y: 'air_temperature', scale: 1});
    }
    if (formValues.wind) {
      temp.dataTypes.push({name: 'Wind', x: 'Timestamp', y: '', scale: 1});
    }
    if (formValues.solar) {
      temp.dataTypes.push({name: 'Solar', x: 'Timestamp', y: 'PolyP1v', y_ref: 'Poly', scale: 1});
    }
    this.histService.getData(formValues, (data) => {
      const total = [];
      data.forEach((value) => {
        total.push(...value.Items);
      });
      temp.rawData = total;
      this.componentRef.instance.setChart(temp);
    });

  }

  exportData() {
    // Get all data
    const allData = [];
    let n = 0;
    // tslint:disable-next-line:forin
    for (const chart in this.components) {
      allData.push(this.components[chart].instance.getSortedData());
      n = n + 1;
    }
    this.convertJSON(allData[0].Solar.data);
    // Export data to CSV
    this.exportCSV(this.obj2csv(allData, null));

  }

  convertJSON(arrayOfJSONs) {
    const newJSON = {};
    // tslint:disable-next-line:forin
    for (const dataSet in arrayOfJSONs) {
      const subKeys = [];
      this.getSubValue(arrayOfJSONs[dataSet], subKeys);
      console.log(subKeys);
      subKeys.forEach((value) => {
        newJSON[value[0]][value[1]][value[2][0]].push(arrayOfJSONs[dataSet][value[0]][value[1]][value[2][0]]);
      });
    }
  }

  getSubValue(object, subKeys) {
    // tslint:disable-next-line:forin
    for (const key in object) {
      const tmpValue = object[key];
      if (typeof tmpValue === 'object') {
        const nextKeys = [];
        nextKeys.push(key);
        this.getRecursiveSubValue(tmpValue, nextKeys);
        subKeys.push(nextKeys);
      } else {
        subKeys.push(key);
      }
    }
  }

  getRecursiveSubValue(object, subKeys) {
    const newKeys = [];
    // tslint:disable-next-line:forin
    for (const key in object) {
      const tmpValue = object[key];
      subKeys.push(key);
      if (typeof tmpValue === 'object') {
        this.getRecursiveSubValue(tmpValue, newKeys);
        subKeys.push(newKeys);
      } else {
      }
    }
  }

  obj2csv(obj, opt) {
    if (typeof obj !== 'object') { return null; }
    opt = opt || {};
    const scopechar = opt.scopechar || '/';
    const delimeter = opt.delimeter || ',';
    if (Array.isArray(obj) === false) { obj = [obj]; }
    // tslint:disable-next-line:one-variable-per-declaration
    let curs, name, rownum, key, queue;
    // tslint:disable-next-line:one-variable-per-declaration
    const values = [], rows = [], headers = {}, headersArr = [];
    console.log(obj.length);
    for (rownum = 0; rownum < obj.length; rownum++) {
      queue = [obj[rownum], ''];
      rows[rownum] = {};
      while (queue.length > 0) {
        name = queue.pop();
        curs = queue.pop();
        if (curs !== null && typeof curs === 'object') {
          for (key in curs) {
            if (curs.hasOwnProperty(key)) {
              queue.push(curs[key]);
              queue.push(name + (name ? scopechar : '') + key);
            }
          }
        } else {
          if (headers[name] === undefined) { headers[name] = true; }
          rows[rownum][name] = curs;
        }
      }
      values[rownum] = [];
    }
    // create csv text
    for (key in headers) {
      if (headers.hasOwnProperty(key)) {
        headersArr.push(key);
        for (rownum = 0; rownum < obj.length; rownum++) {
          values[rownum].push(rows[rownum][key] === undefined
            ? ''
            : JSON.stringify(rows[rownum][key]));
        }
      }
    }
    for (rownum = 0; rownum < obj.length; rownum++) {
      values[rownum] = values[rownum].join(delimeter);
    }
    console.log(values);
    return '"' + headersArr.join('"' + delimeter + '"') + '"\n' + values.join('\n');
  }

  exportCSV(csv) {
    const exportedFilename = 'export.csv';

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', exportedFilename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

}
