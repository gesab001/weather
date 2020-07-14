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
  id: string;
  cityWeather: CityWeather[];
  constructor(private route: ActivatedRoute, private cityweatherService: CityweatherService) { }

  ngOnInit(): void {

     this.route.paramMap.subscribe(params => { this.id = params.get('id');});
     this.loadData();
  }

 loadData() {
    this.subscription = this.cityweatherService.getCities(this.id).subscribe(
      res => (this.cityWeather = res),
      error => console.log(error),
    );
  }

}
