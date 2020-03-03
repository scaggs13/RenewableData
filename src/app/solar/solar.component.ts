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
    this.setBattery(75);
  }
  setBattery(batteryP: number) {
    document.getElementById('fill').style.transform = 'scaleX(' + batteryP / 100 + ')';
    document.getElementById('fill').style.fill = this.perc2color(batteryP).toString();
  }

  perc2color(perc: number) {
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
  /* displaySolarData(id: number) {
    if (this.sData) {
      let n = [0, 0, 0, 0];
      let type = ['', ''];
      let vars = [this.variablesP, this.variablesM];
      if (id === 0) {
        n = [0, 4, 1, 5];
        type = ['Poly', 'Poly'];
      } else if (id === 1) {
        vars[1] = this.variablesM;
        n = [2, 6, 0, 4];
        type = ['Poly', 'Mono'];
      } else if (id === 3) {
        vars = [this.variablesM, this.variablesM];
        n = [1, 5, 2, 6];
        type = ['Mono', 'Mono'];
      }
      return '<div>' +
        '        <li> yeet</li>' +
        '        <li>' + vars[0][n[0]].name + ': ' + this.sData[type[0]][vars[0][n[0]].value] +
        ' | number: \'1.2-5\'}}</li>\n' +
        '        <li>' + vars[0][n[1]].name + ': ' + this.sData[type[0]][vars[0][n[1]].value] +
        ' | number: \'1.2-5\'}}</li>\n' +
        '        <li>' + vars[1][n[2]].name + ': ' + this.sData[type[1]][vars[1][n[2]].value] +
        '| number: \'1.2-5\'}}</li>\n' +
        '        <li>' + vars[1][n[3]].name + ': ' + this.sData[type[1]][vars[1][n[0]].value] +
        '| number: \'1.2-5\'}}</li>\n' +
        '' +
        '</div>';
    } else {
      return '<div></div>';
    }
  } */ // probably delete this.

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.destroyed$.next();
  }

}
