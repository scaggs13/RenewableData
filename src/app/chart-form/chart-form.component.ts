import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-chart-form',
  templateUrl: './chart-form.component.html',
  styleUrls: ['./chart-form.component.css']
})
export class ChartFormComponent implements OnInit {
  dataTypes = [{id: 0, value: 'Solar'}, {id: 1, value: 'Wind'}, {id: 2, value: 'Weather'}];
  submitted = false;
  @Output() addChart = new EventEmitter<object>();

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    // console.log(form.controls);
    // todo: convert dates to timestamp values
    const output = {
      start: new Date(form.controls.start.value).getTime() / 1000
      , end: new Date(form.controls.end.value).getTime() / 1000
      , weather: !!form.controls.Weather.value
      , wind: !!form.controls.Wind.value
      , solar: !!form.controls.Solar.value
      , chartType: form.controls.type.value
    };
    // console.log(output);
    this.addChart.emit(output);
    form.resetForm();
  }

  // get diagnostic() { return JSON.stringify(this.model); }
  dropDown() {
    document.getElementById('myDropdown').classList.toggle('show');

  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const nd = document.getElementById('myDropdown');
    const el = event.target;
    // @ts-ignore
    if (el.className !== 'dropbtn' && !(nd && el instanceof Node && nd.contains(el))) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  getTime(epochTime) {
    const date = new Date(epochTime / 1000);
    return '' + date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear();
  }
}
