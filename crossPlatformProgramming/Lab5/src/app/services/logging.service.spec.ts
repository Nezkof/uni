// import { TestBed } from '@angular/core/testing';
// import { LoggingService } from './logging.service';

// describe('LoggingService', () => {
//   let service: LoggingService;
//   let consoleSpy: jasmine.Spy;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [LoggingService],
//     });

//     service = TestBed.inject(LoggingService);

//     // Шпигуємо на метод console.log
//     consoleSpy = spyOn(console, 'log');
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should call console.log with correct message and result', () => {
//     const message = 'Test message';
//     const result = 42;

//     service.logToConsole(message, result);

//     expect(consoleSpy).toHaveBeenCalledWith(`log: ${message} | ${result}`);
//   });
// });
