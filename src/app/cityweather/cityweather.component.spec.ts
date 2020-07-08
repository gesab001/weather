import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityweatherComponent } from './cityweather.component';

describe('CityweatherComponent', () => {
  let component: CityweatherComponent;
  let fixture: ComponentFixture<CityweatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityweatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityweatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
