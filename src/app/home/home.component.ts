import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityWeather } from '../cityweather/cityweather';
import { CityweatherService} from '../cityweather/cityweather.service';
import { filter, map } from 'rxjs/operators';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [CityweatherService]
})
export class HomeComponent implements OnInit {

 today: number;
  lat: string;
  lon: string;  
  cityname: string;
  defaultLocation: JSON;
  state: string;
  country: string;
  cityWeather: CityWeather[];
  subscription;
  constructor(private route: ActivatedRoute, private cityweatherService: CityweatherService) { }

  ngOnInit(): void {
     this.today = Date.now();
     /*this.route.paramMap.subscribe(params => { 
              this.lat = params.get('lat');
              this.lon = params.get('lon');
              this.cityname = params.get('city');
              this.state = params.get('state');
              this.country = params.get('country');
              console.log("params", params);
     });*/
    /* this.defaultLocation = JSON.parse(localStorage.getItem("defaultLocation"));
     this.lat = this.defaultLocation["items"][0]["lat"];
     this.lon = this.defaultLocation["items"][0]["lon"];
     this.cityname = this.defaultLocation["items"][0]["city"];
     this.state = this.defaultLocation["items"][0]["state"];
     this.country = this.defaultLocation["items"][0]["country"];
     this.loadData();*/
     this.getLocation();
  }

 loadDefaultLocation(){
     var lat = "-36.8509";
     var long = "174.7645";
     this.cityname = "Auckland";
     this.country = "NZ";
     this.loadData(lat, long);
 }
 
 getHour(date: any, index: number){
        let myDate =  new Date(date);
        myDate.setHours( myDate.getHours() + index );  
        return myDate;
 }
 getDay(date: any, index: number){
        let myDate =  new Date(date);
        myDate.setDate(myDate.getDate() + index);
        return myDate;
 }
 getSunTime(date: any){
        let myDate =  new Date(date);
        return myDate;
 }
 loadData(lat, lon) {
    this.subscription = this.cityweatherService.getCities(lat, lon).subscribe(
      res => (this.cityWeather = res),
      error => console.log(error),
    );
  }
  
  getLocation() {
      var x = document.getElementById("demo");
	  if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
		  this.loadData(position.coords.latitude, position.coords.longitude);
		}, (err) => {this.loadData("-36.8509", "174.7645"); this.cityname= "Auckland"; this.country="NZ";});
	  } else { 
		x.innerHTML = "Geolocation is not supported by this browser.";
	  }
  }
}
