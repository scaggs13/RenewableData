import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../weather.service';
import {WebsocketService} from '../websocket.service';
import {isEmpty, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
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
  messages: Message[] = [];
  data: [] = [];
  msgCtrl = new FormControl('');
  destroyed$ = new Subject();
  constructor(private configService: WeatherService, private webSocket: WebsocketService) { }
  wData = {};
  loadData() {
    this.configService.getWeather().subscribe(data => this.wData = data); // .obs[0]);
  }
  ngOnInit() {
  }
  getRealTime() {
    this.webSocket.connect().pipe(takeUntil(this.destroyed$))
      .subscribe(messages => this.saveValues(messages));
  }
  epochToJsDate(ts) {
    // ts = epoch timestamp
    // returns date obj
    return new Date(ts * 1000);
  }
  saveValues(report) {
    this.messages.push(report);
    if (report.obs) {
     this.data = report.obs[0];
    }
  }
  sendMessage() {
    this.webSocket.send({ type: 'listen_start',
      device_id: 42162,
      id: '2098388936' });
    this.msgCtrl.setValue('');
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.destroyed$.next();
  }

}
