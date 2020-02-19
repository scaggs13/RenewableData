import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';
// import {webSocket, WebSocketSubject} from 'rxjs/internal-compatibility';
// import {delay, filter, map, retryWhen, switchMap} from 'rxjs/operators';
// import {Observable, of} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor() {
  }
}
  /* url = `wss://ws.weatherflow.com/swd/data?api_key=20c70eae-e62f-4d3b-b3a4-8586e90f3ac8`;
  connection$: WebSocketSubject<any>;
  RETRY_SECONDS = 10;

  connect(): Observable<any> {
    return of(this.url).pipe(
      switchMap(wsUrl => {
        if (this.connection$) {
          return this.connection$;
        } else {
          this.connection$ = webSocket(wsUrl);
          return this.connection$;
        }
      }),
      retryWhen((errors) => errors.pipe(delay(this.RETRY_SECONDS)))
    );
  }

  send(data: any) {
    if (this.connection$) {
      this.connection$.next(data);
    } else {
      console.error('Did not send data, open a connection first');
    }
  }

  closeConnection() {
    if (this.connection$) {
      this.connection$.complete();
      this.connection$ = null;
    }
  }
  // OnDestroy
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() { // OnDestroy
    this.closeConnection();
  }

  constructor() {
  }
} */
