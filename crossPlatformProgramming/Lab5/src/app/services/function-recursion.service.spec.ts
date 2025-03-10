import { TestBed } from '@angular/core/testing';
import { FunctionRecursionService } from './function-recursion.service';
import { LoggingService } from './logging.service';

describe('FunctionRecursionService', () => {
  let service: FunctionRecursionService;
  let loggingServiceSpy: jasmine.SpyObj<LoggingService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LoggingService', ['logToConsole']);

    TestBed.configureTestingModule({
      providers: [
        FunctionRecursionService,
        { provide: LoggingService, useValue: spy },
      ],
    });

    service = TestBed.inject(FunctionRecursionService);
    loggingServiceSpy = TestBed.inject(
      LoggingService
    ) as jasmine.SpyObj<LoggingService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct value for calculateRecursiveSeries', () => {
    const x = 2;
    const terms = 3;

    // term1: -2^(2*0)  = -1
    // term2: -2^(2*1)  = -4
    // term3: -2^(2*2)  = -16
    // Сума: -1 - 4 - 16 = -21
    const result = service.calculateRecursiveSeries(x, 1, terms);

    expect(result).toBe(-21);
  });

  it('should call loggingService.logToConsole correct number of times', () => {
    service.calculateRecursiveSeries(2, 1, 3);

    expect(loggingServiceSpy.logToConsole.calls.count()).toBe(3);
  });

  it('should return 0 when terms is 0', () => {
    const result = service.calculateRecursiveSeries(2, 1, 0);
    expect(result).toBe(0);
  });
});
