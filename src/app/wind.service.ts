import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindService {
  public windData: Observable<object>;

  constructor(private http: HttpClient, private socket: Socket) {
    this.windData = this.socket.fromEvent<object>('data_wind');
  }
  getLatestWind() {
    this.socket.emit('req_latest', 'wind');
  }
}
