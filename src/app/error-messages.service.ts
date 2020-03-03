import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {
  public errorMsg: Observable<object>;
  constructor(private socket: Socket) {
    this.errorMsg = this.socket.fromEvent<object>('err_msg');
  }
}
