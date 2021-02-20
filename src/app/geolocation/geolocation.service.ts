

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Geolocation } from './geolocation';

import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { tap } from 'rxjs/operators';
import {publishReplay, refCount} from 'rxjs/operators';
import { filter, map } from 'rxjs/operators';

@Injectable()

export class GeolocationService {
  _geolocation: Observable<Geolocation[]> = null;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('CitiesService');
  }

  clearCache() {
    this._geolocation = null;
  }



  reverseGeocoding(lat: string, long: string) {
    var url = 'https://api.openweathermap.org/geo/1.0/reverse?limit=5&appid=68bcecc7386ea3f60442a466d3fc9503&' +"lat="+lat+"&lon="+long;
    this.clearCache();
    if (!this._geolocation) {
      console.log(url);
      this._geolocation = this.http
        .get<Geolocation[]>(url)
        .pipe(publishReplay(1), refCount());
    }
    return this._geolocation;
  }

 

}
