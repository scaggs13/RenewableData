import { TestBed } from '@angular/core/testing';

import { SolarService } from './solar.service';

describe('SolarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolarService = TestBed.get(SolarService);
    expect(service).toBeTruthy();
  });
});
