import { Component,  Input, OnChanges, SimpleChanges,ViewChild, OnInit } from '@angular/core';
import { City } from './cities';
import { CitiesService} from './cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.sass'],
  providers: [CitiesService]
})
export class CitiesComponent implements OnInit {
  cache = {};
  name: string = 'test';
  id: number = 0;
  filtered: string = "test";  
  cities: any;
  citiesjson: JSON;
  subscription;
  storage: number;
  constructor(private citiesService: CitiesService) { }

  somethingChanged(event){
     this.name = event.target.value;
     this.id = this.cities[this.name];
     
     this.filtered = this.name;
  }

  ngOnInit(): void {
       this.loadData();
       this.citiesjson = <JSON>this.cities;
  }

 getCityList(): void {
    this.citiesService.getCityList()
      .subscribe(city => (this.cities = city));
  }

  loadData() {
    this.subscription = this.citiesService.getCities().subscribe(
      res => (this.cities = res),
      error => console.log(error),
    );
  }

  loadCachedData(){

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('Destroyed');
  }
}
