import { TestBed } from '@angular/core/testing';

import { FunctionSeriesService } from './function-series.service';

describe('FunctionSeriesService', () => {
  let service: FunctionSeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionSeriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
