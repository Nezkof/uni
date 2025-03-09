import { TestBed } from '@angular/core/testing';

import { FunctionTableService } from './function-table.service';

describe('FunctionTableService', () => {
  let service: FunctionTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
