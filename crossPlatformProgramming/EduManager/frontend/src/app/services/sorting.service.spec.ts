import { TestBed } from '@angular/core/testing';
import { SortingService } from './sorting.service';

describe('SortingService', () => {
  let service: SortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial sorting as ascending (true)', (done) => {
    service.isAscending$.subscribe((value) => {
      expect(value).toBeTrue();
      done();
    });
  });

  it('should change sorting order when setSorting is called', (done) => {
    service.setSorting(false);

    service.isAscending$.subscribe((value) => {
      expect(value).toBeFalse();
      done();
    });
  });

  it('should correctly update sorting state multiple times', (done) => {
    service.setSorting(false);
    service.setSorting(true);

    service.isAscending$.subscribe((value) => {
      expect(value).toBeTrue();
      done();
    });
  });
});
