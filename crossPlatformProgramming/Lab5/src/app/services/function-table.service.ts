import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class FunctionTableService {
  constructor(private loggingService: LoggingService) {}

  calculate(x: number): number {
    return 1 / (x * x - 1);
  }
}
