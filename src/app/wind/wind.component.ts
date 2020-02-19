import { Component, OnInit } from '@angular/core';
import {ServerConnectService} from '../server-connect.service';

@Component({
  selector: 'app-wind',
  templateUrl: './wind.component.html',
  styleUrls: ['./wind.component.css']
})
export class WindComponent implements OnInit {
  message = {};
  constructor(private serverConn: ServerConnectService) { }

  getMessage() {
    this.serverConn.getMessage().subscribe(mes => this.message = mes);
  }
  ngOnInit() {
    this.getMessage();
  }

}
