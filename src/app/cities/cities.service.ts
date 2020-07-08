import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { City } from './cities';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { tap } from 'rxjs/operators';
import {publishReplay, refCount} from 'rxjs/operators';

@Injectable()

export class CitiesService {
  _cities: Observable<any> = null;

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

  getCities() {
    if (!this._cities) {
      this._cities = this.http
        .get(this.url)
        .pipe(publishReplay(1), refCount());
    }
    return this._cities;
  }

  getCachedCities(){
          return this._cities;
  }
}
