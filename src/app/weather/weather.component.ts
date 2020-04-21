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

  convertWindDirection(degrees) {
    if (degrees >= 348.75 || degrees < 11.25) {
      return 'N';
    } else if (degrees >= 11.25 && degrees < 33.75) {
      return 'NNE';
    } else if (degrees >= 33.75 && degrees < 56.25) {
      return 'NE';
    } else if (degrees >= 56.25 && degrees < 78.75) {
      return 'ENE';
    } else if (degrees >= 78.75 && degrees < 101.25) {
      return 'E';
    } else if (degrees >= 101.25 && degrees < 123.75) {
      return 'ESE';
    } else if (degrees >= 123.75 && degrees < 146.25) {
      return 'SE';
    } else if (degrees >= 146.25 && degrees < 168.75) {
      return 'SSE';
    } else if (degrees >= 168.75 && degrees < 191.25) {
      return 'S';
    } else if (degrees >= 191.25 && degrees < 213.75) {
      return 'SSW';
    } else if (degrees >= 213.75 && degrees < 236.25) {
      return 'SW';
    } else if (degrees >= 236.25 && degrees < 258.75) {
      return 'WSW';
    } else if (degrees >= 258.75 && degrees < 281.25) {
      return 'W';
    } else if (degrees >= 281.25 && degrees < 303.75) {
      return 'WNW';
    } else if (degrees >= 303.75 && degrees < 326.25) {
      return 'NW';
    } else if (degrees >= 326.25 && degrees < 348.75) {
      return 'NNW';
    }
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.destroyed$.next();
  }

}
