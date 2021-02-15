import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { City } from './cities';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { tap } from 'rxjs/operators';
import {publishReplay, refCount} from 'rxjs/operators';
import { filter, map } from 'rxjs/operators';

@Injectable()

export class CitiesService {
  _cities: Observable<City[]> = null;

  private handleError: HandleError;
  url = 'https://gesab001.github.io/assets/weather/city.list.json';
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('CitiesService');
  }

  clearCache() {
    this._cities = null;
  }

  /** GET heroes from the server */
  getCityList (): Observable<City[]> {
    return this.http.get<City[]>(this.url)
      .pipe(
        catchError(this.handleError('getCityList', []))
      );
  }
  getReports(): Observable<City[]>  {
    console.log("in get Reports Service Call");
    return this.http.get<City[]>(this.url)
      .pipe(
        tap(data => console.log('All Data Retrieved - ' + JSON.stringify(data))),
        catchError(this.handleError));
  }

  getReportDetails(name : string) : Observable<City[]>
  {
    return this._cities.pipe(
      map((reports : City[]) => reports.filter(p => p.name.toLowerCase()===name.toLowerCase()))
    );
  }

  getCityName(lat, long) : Observable<City[]> {
     console.log(this.getCities());
     return this.getCities().pipe(map((reports : City[]) => reports.filter(p => Number.parseFloat(p.coord.lat).toFixed(1)===Number.parseFloat(lat).toFixed(1) && Number.parseFloat(p.coord.lon).toFixed(1)===Number.parseFloat(long).toFixed(1) ))
    );
  }
   
  getCities() {
    if (!this._cities) {
      this._cities = this.http
        .get<City[]>(this.url)
        .pipe(publishReplay(1), refCount());
    }
    return this._cities;
  }

  getCachedCities(){
          return this._cities;
  }
}
