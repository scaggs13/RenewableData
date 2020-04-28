import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private socket: Socket) { }

  sendEmail(msg) {
    this.socket.emit('email', msg);
  }
}
