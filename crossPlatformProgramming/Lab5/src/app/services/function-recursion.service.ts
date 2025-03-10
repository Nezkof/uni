import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class FunctionRecursionService {
  constructor(private loggingService: LoggingService) {}

  calculateRecursiveSeries(
    x: number,
    n: number = 1,
    terms: number = 10
  ): number {
    if (n > terms) {
      return 0;
    }

    let currentTerm = -Math.pow(x, 2 * (n - 1));
    let result = currentTerm + this.calculateRecursiveSeries(x, n + 1, terms);

    this.loggingService.logToConsole(
      `resursion: term = ${n}, x = ${x}`,
      result
    );

    return result;
  }
}
