import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler }     from './http-error-handler.service';
import { MessageService }       from './message.service';


import {MatListModule} from '@angular/material/list'; 


import {MatFormFieldModule} from '@angular/material/form-field'; 

import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitiesComponent } from './cities/cities.component';
import { CityweatherComponent } from './cityweather/cityweather.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoriteLocationsComponent } from './favorite-locations/favorite-locations.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    CityweatherComponent,
    FavoriteLocationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatListModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [HttpErrorHandler, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
