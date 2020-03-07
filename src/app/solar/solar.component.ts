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
  svg = './assets/images/solar-panel.svg';
  svgCc = './assets/images/CC.svg';
  destroyed$ = new Subject();
  variablesP = SPVARIABLES;
  variablesM = SMVARIABLES;
  constructor(private solarService: SolarService) { }
  sData = {};

  ngOnInit() {
    this.solarService.getLatestSolar();
    this.solarService.solarData.subscribe(data => this.sData = data);
    this.setBattery(50);
  }
  setBattery(batteryP: number) {
    document.getElementById('fill').style.transform = 'scaleX(' + batteryP / 100 + ')';
    document.getElementById('fill').style.fill = this.perc2color(batteryP).toString();
  }

  perc2color(perc: number) { // Converts a number (0-100) to a color value.
    let r = 0;
    let g = 0;
    const b = 0;
    if (perc < 50) {
      r = 255;
      g = Math.round(5.1 * perc);
    } else {
      g = 255;
      r = Math.round(510 - 5.10 * perc);
    }
    const h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.destroyed$.next();
  }

}
