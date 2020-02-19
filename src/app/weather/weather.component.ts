import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../weather.service';
import {WebsocketService} from '../websocket.service';
import {isEmpty, takeUntil} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {Message} from '@angular/compiler/src/i18n/i18n_ast';
import {VARIABLES} from '../weatherDataVariables';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  // TODO: get weather data from server side instead of a direct http call.
  variables = VARIABLES;
  data: [] = [];
  destroyed$ = new Subject();

  constructor(private configService: WeatherService, private webSocket: WebsocketService) { }
  wData = {};
  loadData() {
    // this.configService.weatherData.subscribe(data => this.wData = data.obs[0]); // .obs[0]);
  }
  ngOnInit() {
    this.configService.getLatestWeather();
    this.configService.weatherData.subscribe(data => this.wData = data.obs[0]);
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
