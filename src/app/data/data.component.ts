import {Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { HistoricalDataService } from '../historical-data.service';
import { ChartComponent } from '../chart/chart.component';
import { ChartFormComponent } from '../chart-form/chart-form.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  private testChart: ChartComponent;
  @ViewChild('chartContainer', {static: false, read: ViewContainerRef }) container;
  private componentRef: ComponentRef<ChartComponent>;

  constructor(private histService: HistoricalDataService, private resolver: ComponentFactoryResolver) { }

  ngOnInit() {}

  addChart(formValues) {
    console.log(formValues);

    const factory: ComponentFactory<ChartComponent> = this.resolver.resolveComponentFactory(ChartComponent);
    this.componentRef = this.container.createComponent(factory);
    const temp = {
      type: formValues.chartType, start: formValues.start, end: formValues.end
      , dataTypes: [], rawData: {}
    };
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
      temp.rawData = data;
      console.log(temp.rawData);
      this.componentRef.instance.setChart(temp);
    });


  }
}
