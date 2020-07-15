import { Component,  Input, OnChanges, SimpleChanges,ViewChild, OnInit } from '@angular/core';
import { City } from './cities';
import { CitiesService} from './cities.service';
import { filter, map } from 'rxjs/operators';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.sass'],
  providers: [CitiesService]
})
export class CitiesComponent implements OnInit{
  cache = {};
  name: string = '';
  id: number = 0;
  filteredcities: City[];
    
  cities: City[];
  subscription;
  storage: number;
  regex: string;
  constructor(private citiesService: CitiesService) { }

  somethingChanged(event){
     this.name = event.target.value;
     this.filterLocations(this.name);
  } 

  ngOnInit(): void {
       this.loadData();

  }
  
  filterLocations(name: string) {
    
    this.subscription = this.citiesService.getReportDetails(name).subscribe(
      res => (this.filteredcities = res),
      error => console.log(error),
    );
  }

  loadData() {
    this.subscription = this.citiesService.getCities().subscribe(
      res => (this.cities = res),
      error => console.log(error),
    );
  }

  addToFavorites(lat, lon, city, state, country){
   let location = {'lat': lat, 'lon': lon, 'city': city, 'state': state, 'country': country};
   let favoritesList = JSON.parse(localStorage.getItem("favoriteLocations"));
   if (favoritesList==null){
       let newlist = {"items": []};
       newlist["items"].push(location);
       localStorage.setItem("favoriteLocations", JSON.stringify(newlist));
   }else{
     favoritesList["items"].push(location);
     localStorage.setItem("favoriteLocations", JSON.stringify(favoritesList));
   } 
  }

  addToFavorites1(lat, lon, city, country){
   let location = {'lat': lat, 'lon': lon, 'city': city, 'state': '', 'country': country};
   let favoritesList = JSON.parse(localStorage.getItem("favoriteLocations"));
   if (favoritesList==null){
       let newlist = {"items": []};
       newlist["items"].push(location);
       localStorage.setItem("favoriteLocations", JSON.stringify(newlist));
   }else{
     favoritesList["items"].push(location);
     localStorage.setItem("favoriteLocations", JSON.stringify(favoritesList));
   } 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('Destroyed');
  }
}
