import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CityWeather } from './cityweather';


import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { tap } from 'rxjs/operators';
import {publishReplay, refCount} from 'rxjs/operators';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class CityweatherService {
_cities: Observable<CityWeather[]> = null;
_geolocation: Observable<Geolocation[]> = null;

  private handleError: HandleError;
  
  /**url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=68bcecc7386ea3f60442a466d3fc9503&id=';*/
  
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('CitiesService');
  }

  clearCache() {
    this._cities = null;
    this._geolocation = null;
  }

  /** GET heroes from the server */
/** getCityList (): Observable<CityWeather[]> {
    return this.http.get<CityWeather[]>(this.url)
      .pipe(
        catchError(this.handleError('getCityList', []))
      );
  }*/
 
  getCities(lat: string, long: string) {
    var url = 'https://api.openweathermap.org/data/2.5/onecall?units=metric&exclude=minutely&appid=68bcecc7386ea3f60442a466d3fc9503&' +"lat="+lat+"&lon="+long;
    this.clearCache();
    if (!this._cities) {
      console.log(url);
      this._cities = this.http
        .get<CityWeather[]>(url)
        .pipe(publishReplay(1), refCount());
    }
    return this._cities;
  }

  getCachedCities(){
          return this._cities;
  }

}
