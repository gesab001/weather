import { TestBed } from '@angular/core/testing';

import { CityweatherService } from './cityweather.service';

describe('CityweatherService', () => {
  let service: CityweatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityweatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
