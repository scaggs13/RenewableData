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
    const output = {start: form.controls.start.value, end: form.controls.end.value
    , weather: form.controls.Weather.value ? true : false
    , wind: form.controls.Wind.value ? true : false
    , solar: form.controls.Solar.value ? true : false
    , chartType: form.controls.type.value};
    // console.log(output);
    this.addChart.emit(output);
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


}

