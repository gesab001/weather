import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  encapsulation: ViewEncapsulation.None,
  providers: [CityweatherService, CitiesService]
})
export class HomeComponent implements OnInit {
  panelOpenState = false;
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
 getToday(date: any){
	let myDate = new Date(date);
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

  unitConverter(speed, operator, unit){
    if (operator=="multiply"){
      return Math.round(parseFloat(speed) * unit);
    }
    if (operator=="divide"){
      return Math.round(parseFloat(speed) / unit);
    }
  }

  getWindDirection(degree){
    var unit = parseFloat(degree);
    var result;
    if(unit<348.75 && unit>=11.25){
       result = "N";
    }
    if(unit>11.25 && unit<=33.75){
       result = "NNE";
    }
    if(unit>33.75 && unit<=56.25){
       result = "NE";
    }
    if(unit>56.25 && unit<=78.75){
       result = "ENE";
    }
    if(unit>78.75 && unit<=101.25){
       result = "E";
    }
    if(unit>101.25 && unit<=123.75){
       result = "ESE";
    }
    if(unit>123.75 && unit<=146.25){
       result = "SE";
    }
    if(unit>146.25 && unit<=168.75){
       result = "SSE";
    }
    if(unit>168.75 && unit<=191.25){
       result = "S";
    }
    if(unit>191.25 && unit<=213.75){
       result = "SSW";
    }
    if(unit>213.75 && unit<=236.25){
       result = "SW";
    }
    if(unit>236.25 && unit<=258.75){
       result = "WSW";
    }
    if(unit>258.75 && unit<=281.25){
       result = "W";
    }
    if(unit>281.25 && unit<=303.75){
       result = "WNW";
    } 
    if(unit>303.75 && unit<=326.25){
       result = "NW";
    } 
    if(unit>326.25 && unit<348.75){
       result = "NNW";
    }  
    return result;
  }

  isNewDay(time){
     if (time=="12AM"){
        return true;
     }
  }

  getDayName(d){
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var n = weekday[d.getDay()];
	return n;
  }

  getDateNumber(d){
	return d.getDate();  
  }
  
  getMonthName(today){
  return today.toLocaleString('default', { month: 'long' }); 
   
  }
}
