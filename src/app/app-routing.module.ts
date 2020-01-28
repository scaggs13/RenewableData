import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SolarComponent} from './solar/solar.component';
import {WindComponent} from './wind/wind.component';
import {DataComponent} from './data/data.component';
import {WeatherComponent} from './weather/weather.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'solar', component: SolarComponent},
  {path: 'wind', component: WindComponent},
  {path: 'data', component: DataComponent},
  {path: 'weather', component: WeatherComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
