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

}
