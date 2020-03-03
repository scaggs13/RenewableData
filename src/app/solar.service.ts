import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolarService {
  public solarData: Observable<object>;

  constructor(private http: HttpClient, private socket: Socket) {
    this.solarData = this.socket.fromEvent<object>('data_solar');
  }
  getLatestSolar() {
    this.socket.emit('req_latest', 'solar');
  }

}
