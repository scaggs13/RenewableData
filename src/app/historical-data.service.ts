import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class HistoricalDataService {
id = '';
historicalData = {};
private dataAvailable = false;
  constructor(private socket: Socket) {
    this.socket.on('SocketID', (msg) => {
      this.id = msg;
    });
    this.socket.on('hist_data_', (msg) => {
      // this.historicalData = new Promise<string>(((resolve, reject) => {
      //  resolve(msg);
      // }));
    });
    this.socket.emit('get_id', '');
  }

  getData(msg, fn) {
    this.socket.emit('hist_data', msg, (data, err) => {
      fn(data, err);
    });
  }
}
