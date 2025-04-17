import { TestBed } from '@angular/core/testing';

import { APIDBService } from './apidb.service';

describe('APIDBServiceService', () => {
  let service: APIDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
