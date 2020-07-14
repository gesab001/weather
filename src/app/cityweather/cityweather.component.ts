import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityWeather } from './cityweather';
import { CityweatherService} from './cityweather.service';
import { filter, map } from 'rxjs/operators';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-cityweather',
  templateUrl: './cityweather.component.html',
  styleUrls: ['./cityweather.component.sass'],
  providers: [CityweatherService]
})
export class CityweatherComponent implements OnInit {
  today: number;
  lat: string;
  lon: string;  
  cityname: string;
  state: string;
  country: string;
  cityWeather: CityWeather[];
  subscription;
  constructor(private route: ActivatedRoute, private cityweatherService: CityweatherService) { }

  ngOnInit(): void {
     this.today = Date.now();
     this.route.paramMap.subscribe(params => { 
              this.lat = params.get('lat');
              this.lon = params.get('lon');
              this.cityname = params.get('city');
              this.state = params.get('state');
              this.country = params.get('country');
     });
     this.loadData();
  }

 getHour(date: any, index: number){
        let myDate =  new Date(date);
        myDate.setHours( myDate.getHours() + index );  
        return myDate;
 }
 getSunTime(date: any){
        let myDate =  new Date(date);
        return myDate;
 }
 loadData() {
    this.subscription = this.cityweatherService.getCities(this.lat, this.lon).subscribe(
      res => (this.cityWeather = res),
      error => console.log(error),
    );
  }

}
