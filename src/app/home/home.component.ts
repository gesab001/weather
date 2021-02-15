import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityWeather } from '../cityweather/cityweather';
import { CityweatherService} from '../cityweather/cityweather.service';
import { City } from '../cities/cities';
import { CitiesService} from '../cities/cities.service';
import { filter, map } from 'rxjs/operators';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [CityweatherService, CitiesService]
})
export class HomeComponent implements OnInit {
 filteredcities: City[];
 today: number;
  lat: string;
  lon: string;  
  cityname: string;
  defaultLocation: JSON;
  state: string;
  country: string;
  cityWeather: CityWeather[];
  subscription;
  subscriptionCityName;
  constructor(private route: ActivatedRoute, private cityweatherService: CityweatherService, private citiesService: CitiesService) { }

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
  
  filterCityName(lat, long) {
    
    this.subscription = this.citiesService.getCityName(lat, long).subscribe(
      res => (this.filteredcities = res, this.getCityNameMatch(lat, long, res)),
      error => console.log(error),
    );
  }
  
  getCityNameMatch(lat, long, cities){
     console.log("tomatch: " + lat);
     var shortest = 100;
     var citylist = {}
     for (var x=0; x<cities.length;x++){
        var distance = this.distance(lat, long, cities[x].coord.lat, cities[x].coord.lon, "K");
        var name = cities[x].name;
        var state = cities[x].state;
        var country = cities[x].country;
        citylist[distance] = {"name": name, "state": state, "country": country};
        console.log(distance);
        if (distance<shortest){
            shortest = distance;
        }
        
     }
     console.log("shortest: " + shortest );
     console.log(citylist[shortest]);
     var match =citylist[shortest];
     this.cityname = match.name;
     this.state = match.state;
     this.country = match.country;
      
  }
  
  distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
  }

  getLocation() {
      var x = document.getElementById("demo");
	  if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
		  this.loadData(position.coords.latitude, position.coords.longitude);      this.filterCityName(position.coords.latitude, position.coords.longitude);
		}, (err) => {this.loadData("-36.8509", "174.7645"); this.cityname= "Auckland"; this.country="NZ";});
	  } else { 
		x.innerHTML = "Geolocation is not supported by this browser.";
	  }
  }
}
