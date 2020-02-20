import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../weather.service';
import {Subject} from 'rxjs';
import {VARIABLES} from '../weatherDataVariables';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  variables = VARIABLES;
  data: [] = [];
  destroyed$ = new Subject();

  constructor(private weatherService: WeatherService) { }
  wData = {};
  loadData() {
    // this.weatherService.weatherData.subscribe(data => this.wData = data.obs[0]); // .obs[0]);
  }
  ngOnInit() {
    this.weatherService.getLatestWeather();
    // @ts-ignore
    this.weatherService.weatherData.subscribe(data => this.wData = data.obs[0]);
  }

  epochToJsDate(ts) {
    // ts = epoch timestamp
    // returns date obj
    return new Date(ts * 1000);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.destroyed$.next();
  }

}
