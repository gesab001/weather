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
  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('Destroyed');
  }
}
