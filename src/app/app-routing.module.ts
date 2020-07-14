import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CitiesComponent } from './cities/cities.component';
import {CityweatherComponent} from './cityweather/cityweather.component';

const routes: Routes = [
   {path: 'cities', component: CitiesComponent},
   {path: 'weather/:id', component: CityweatherComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
