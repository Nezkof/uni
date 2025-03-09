import { FunctionRecursionService } from './function-recursion.service';
import { LoggingService } from './logging.service';

describe('FunctionRecursionService', () => {
  let service: FunctionRecursionService;
  let mockLoggingService: jasmine.SpyObj<LoggingService>;

  beforeEach(() => {
    mockLoggingService = jasmine.createSpyObj('LoggingService', [
      'logToConsole',
    ]);
    service = new FunctionRecursionService(mockLoggingService);
  });

  it('повинен створюватися', () => {
    expect(service).toBeTruthy();
  });

  it('повинен правильно обчислювати ряд для x = 0', () => {
    const result = service.calculateRecursiveSeries(0, 1, 5);
    expect(result).toBe(-1); // Ряд: -1 - 0^2 - 0^4 - ... = -1
  });

  it('повинен правильно обчислювати ряд для x = 1', () => {
    const result = service.calculateRecursiveSeries(1, 1, 5);
    expect(result).toBe(-1 - 1 - 1 - 1 - 1); // Ряд: -1 - 1 - 1 - 1 - 1 = -5
  });

  it('повинен правильно обчислювати ряд для x = 0.5', () => {
    const result = service.calculateRecursiveSeries(0.5, 1, 5);
    const expectedValue = -1 - 0.25 - 0.0625 - 0.015625 - 0.00390625;
    expect(result).toBeCloseTo(expectedValue, 10);
  });

  it('повинен логувати правильні значення', () => {
    service.calculateRecursiveSeries(0.5, 1, 3);

    expect(mockLoggingService.logToConsole).toHaveBeenCalledWith(
      'n=1, x=0.5, term=-1',
      jasmine.any(Number)
    );
    expect(mockLoggingService.logToConsole).toHaveBeenCalledWith(
      'n=2, x=0.5, term=-0.25',
      jasmine.any(Number)
    );
    expect(mockLoggingService.logToConsole).toHaveBeenCalledWith(
      'n=3, x=0.5, term=-0.0625',
      jasmine.any(Number)
    );
  });
});
