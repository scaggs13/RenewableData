import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class HistoricalDataService {
id = '';
historicalData = {};
  constructor(private socket: Socket) {
    this.socket.on('SocketID', (msg) => {
      this.id = msg;
    });
    this.socket.on('hist_data_', (msg) => {
      this.historicalData = msg;
    });
    this.socket.emit('get_id', '');
  }

  getData() {
    this.socket.emit('hist_data', {id: this.id, dataType: 'Solar', start: 1583035976, end: 1583599274});
  }
}
