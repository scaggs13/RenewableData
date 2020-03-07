import { Component, OnInit } from '@angular/core';
import { ErrorMessagesService } from '../error-messages.service';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css']
})
export class ErrorMessagesComponent implements OnInit {
  errorMsg: string[]; // todo: error on can't connect?
  constructor(errorService: ErrorMessagesService) {
      errorService.errorMsg.subscribe(msg => {
        if (!msg[1] && this.errorMsg) {
          this.errorMsg.forEach(x => {   // todo: clear all errors under subject
            if (x.includes(msg[0])) {
              const index = this.errorMsg.indexOf(x);
              if (index > -1) {
                this.errorMsg.splice(index, 1);
              }
            }
          });
        } else if (!this.errorMsg && msg[1]) {
          this.errorMsg = [msg[0].toString() + msg[1].toString()];
        } else if (!this.errorMsg.includes(msg[0].toString() + msg[1].toString())) {
          this.errorMsg.push(msg[0].toString() + msg[1].toString());
        }
      });
  }

    ngOnInit() {
  }

}
