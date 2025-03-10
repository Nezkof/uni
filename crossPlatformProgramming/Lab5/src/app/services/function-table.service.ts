import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class FunctionTableService {
  constructor(private loggingService: LoggingService) {}

  calculate(x: number): number {
    if (x === 0) {
      throw new Error('division by zero');
    }
    this.loggingService.logToConsole(`!!! table: x = ${x}`, 1 / (x * x - 1));
    return 1 / (x * x - 1);
  }
}
