import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class FunctionSeriesService {
  constructor(private loggingService: LoggingService) {}

  calculateSeriesValue(x: number, terms: number = 10): number {
    let sum = -1;
    let currentTerm = 1;

    for (let n = 1; n <= terms; n++) {
      currentTerm *= x * x;
      sum -= currentTerm;

      this.loggingService.logToConsole(`series: term = ${n}, x = ${x}`, sum);
    }

    return sum;
  }
}
