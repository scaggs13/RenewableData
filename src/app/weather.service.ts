import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Socket} from 'ngx-socket-io';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  public weatherData: Observable<object>;
  constructor(private http: HttpClient, private socket: Socket) {

    this.weatherData = this.socket.fromEvent<object>('data_weather');
}
  getLatestWeather() {
    this.socket.emit('req_latest', 'weather');
  }

}
