import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { SolarComponent } from './solar/solar.component';
import { WindComponent } from './wind/wind.component';
import { DataComponent } from './data/data.component';
import { WeatherComponent } from './weather/weather.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { ChartComponent } from './chart/chart.component';
import { ChartFormComponent } from './chart-form/chart-form.component';


const config: SocketIoConfig = { url: 'localhost:3000', options: {} };
// const config: SocketIoConfig = { url: 'http://50.17.173.72:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SolarComponent,
    WindComponent,
    DataComponent,
    WeatherComponent,
    ErrorMessagesComponent,
    ChartComponent,
    ChartFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    InlineSVGModule,
    ChartsModule,
    FormsModule
  ],
  entryComponents: [ ChartComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
