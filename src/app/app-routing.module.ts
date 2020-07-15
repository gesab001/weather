import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CitiesComponent } from './cities/cities.component';
import {CityweatherComponent} from './cityweather/cityweather.component';
import {FavoriteLocationsComponent} from './favorite-locations/favorite-locations.component';

const routes: Routes = [
   {path: 'search', component: CitiesComponent},
   {path: 'weather/:lat/:lon/:city/:state/:country', component: CityweatherComponent} ,
   {path: 'favorites', component: FavoriteLocationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
