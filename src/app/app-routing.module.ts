import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CitiesComponent } from './cities/cities.component';
import {HomeComponent } from './home/home.component';

import {CityweatherComponent} from './cityweather/cityweather.component';
import {FavoriteLocationsComponent} from './favorite-locations/favorite-locations.component';
import {AppComponent} from './app.component';
const routes: Routes = [
   {path: '', component: HomeComponent},
   {path: 'weather/:lat/:lon/:city/:state/:country', component: HomeComponent} ,
   {path: 'search', component: CitiesComponent},
   {path: 'weather/:lat/:lon/:city/:state/:country', component: CityweatherComponent} ,
   {path: 'favorites', component: FavoriteLocationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
