import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'C of O Engineering Alternate Energy';
  constructor() {}

  getYear() {
    const date = new Date();
    return date.getFullYear();
  }
}
