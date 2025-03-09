import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor() {}

  logToConsole(message: string, result: number): void {
    console.log(`LOG: ${message} = ${result}`);
  }
}
