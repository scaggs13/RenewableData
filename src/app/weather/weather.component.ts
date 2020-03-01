import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../weather.service';
import {Subject} from 'rxjs';
import {WVARIABLES} from '../dataVariables';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  variables = WVARIABLES;
  destroyed$ = new Subject();

  constructor(private weatherService: WeatherService) { }
  wData = {};
  ngOnInit() {
    this.weatherService.getLatestWeather();
    // @ts-ignore
    this.weatherService.weatherData.subscribe(data => this.wData = (data.obs[0] || data));
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
