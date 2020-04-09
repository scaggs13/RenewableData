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
    const temp = {type: formValues.chartType, start: formValues.start, end: formValues.end
      , dataTypes: [], rawData: {}};
    if (formValues.Weather) {
      temp.dataTypes.push({name: 'Weather', x: 'timestamp', y: 'Temperature'});
    }
    if (formValues.Wind) {
      temp.dataTypes.push({name: 'Wind', x: 'timestamp'});
    }
    if (formValues.Solar) {
      temp.dataTypes.push({name: 'Solar', x: 'timestamp'});
    }
    // this.histService.getData(formValues);
    temp.rawData = this.histService.historicalData; // todo: This might not work. Especially if it takes a long time to load.
    // todo: find out how to wait until this value is assigned.
    this.componentRef.instance.setChart(formValues);
  }
}
