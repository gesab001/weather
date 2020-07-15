import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'weather';
  defaultLocation: JSON;
  defaultOn: boolean = true;
  ngOnInit(): void {
    this.defaultLocation = JSON.parse(localStorage.getItem("defaultLocation"));
  }

  turnOffCityWeatherDefault(){
    this.defaultOn = false;
  }
}
