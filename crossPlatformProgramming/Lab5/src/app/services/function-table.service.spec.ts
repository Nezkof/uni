import { TestBed } from '@angular/core/testing';
import { FunctionTableService } from './function-table.service';
import { LoggingService } from './logging.service';

describe('FunctionTableService', () => {
  let service: FunctionTableService;
  let loggingServiceSpy: jasmine.SpyObj<LoggingService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LoggingService', ['logToConsole']);

    TestBed.configureTestingModule({
      providers: [
        FunctionTableService,
        { provide: LoggingService, useValue: spy },
      ],
    });

    service = TestBed.inject(FunctionTableService);
    loggingServiceSpy = TestBed.inject(
      LoggingService
    ) as jasmine.SpyObj<LoggingService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly calculate function value', () => {
    const x = 0.2;

    const result = service.calculate(x);

    expect(result).toBeCloseTo(-1.041666666666, 5);
  });

  it('should call loggingService.logToConsole once', () => {
    service.calculate(0.2);

    // Логування має відбутися один раз
    expect(loggingServiceSpy.logToConsole.calls.count()).toBe(1);
  });

  it('should throw an error when x^2 - 1 is 0 (division by zero)', () => {
    const x = 0;

    expect(() => service.calculate(x)).toThrow();
  });
});
