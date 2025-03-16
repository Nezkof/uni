import { TestBed } from '@angular/core/testing';
import { FunctionSeriesService } from './function-series.service';
import { LoggingService } from './logging.service';

describe('FunctionSeriesService', () => {
  let service: FunctionSeriesService;
  let loggingServiceSpy: jasmine.SpyObj<LoggingService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LoggingService', ['logToConsole']);

    TestBed.configureTestingModule({
      providers: [
        FunctionSeriesService,
        { provide: LoggingService, useValue: spy },
      ],
    });

    service = TestBed.inject(FunctionSeriesService);
    loggingServiceSpy = TestBed.inject(
      LoggingService
    ) as jasmine.SpyObj<LoggingService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct value for calculateSeriesValue', () => {
    const x = -0.2;
    const terms = 10;

    const result = service.calculateSeriesValue(x, terms);

    expect(result).toBe(-1.0416666666666665);
  });

  it('should call loggingService.logToConsole correct number of times', () => {
    service.calculateSeriesValue(2, 3);

    // Має викликатися 3 рази (по разу на кожен терм)
    expect(loggingServiceSpy.logToConsole.calls.count()).toBe(3);
  });

  it('should return -1 when terms is 0', () => {
    const result = service.calculateSeriesValue(2, 0);
    expect(result).toBe(-1);
  });
});
