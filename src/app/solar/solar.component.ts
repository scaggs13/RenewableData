import { Component, OnInit } from '@angular/core';
import { SolarService } from '../solar.service';
import { Subject } from 'rxjs';
import {SPVARIABLES, SMVARIABLES} from '../dataVariables';

@Component({
  selector: 'app-solar',
  templateUrl: './solar.component.html',
  styleUrls: ['./solar.component.css']
})
export class SolarComponent implements OnInit {
  svg = './assets/images/solar-panel.svg'
  destroyed$ = new Subject();
  variablesP = SPVARIABLES;
  variablesM = SMVARIABLES;
  constructor(private solarService: SolarService) { }
  sData = {};

  ngOnInit() {
    this.solarService.getLatestSolar();
    this.solarService.solarData.subscribe(data => this.sData = data);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.destroyed$.next();
  }

}
