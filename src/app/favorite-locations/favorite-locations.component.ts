import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-locations',
  templateUrl: './favorite-locations.component.html',
  styleUrls: ['./favorite-locations.component.sass']
})
export class FavoriteLocationsComponent implements OnInit {

  constructor() { }

  locations: JSON;

  ngOnInit(): void {
    this.locations = JSON.parse(localStorage.getItem("favoriteLocations"));
  }

  setDefaultLocation(lat, lon, city, state, country){
   let location = {'lat': lat, 'lon': lon, 'city': city, 'state': state, 'country': country};
   let favoritesList = JSON.parse(localStorage.getItem("defaultLocation"));
   if (favoritesList==null){
       let newlist = {"items": []};
       newlist["items"].push(location);
       localStorage.setItem("favoriteLocations", JSON.stringify(newlist));
   }else{
     favoritesList["items"].push(location);
     localStorage.setItem("defaultLocation", JSON.stringify(favoritesList));
   } 
  }

  setDefaultLocation1(lat, lon, city, country){
   let location = {'lat': lat, 'lon': lon, 'city': city, 'state': '', 'country': country};
   let favoritesList = JSON.parse(localStorage.getItem("defaultLocation"));
   if (favoritesList==null){
       let newlist = {"items": []};
       newlist["items"].push(location);
       localStorage.setItem("defaultLocation", JSON.stringify(newlist));
   }else{
     favoritesList["items"].push(location);
     localStorage.setItem("defaultLocation", JSON.stringify(favoritesList));
   } 
  }
}
