import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { WebsocketService} from './websocket.service';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient, private webSocket: WebsocketService) {
}
  getWeather() {
    return this.http.get(
      // `https://swd.weatherflow.com/swd/rest/observations/?device_id=42162&api_key=20c70eae-e62f-4d3b-b3a4-8586e90f3ac8`);
     `https://swd.weatherflow.com/swd/rest/observations/station/12134?api_key=20c70eae-e62f-4d3b-b3a4-8586e90f3ac8`);
    // https://swd.weatherflow.com/swd/rest/stations/12134?api_key=20c70eae-e62f-4d3b-b3a4-8586e90f3ac8`);
  }






}
