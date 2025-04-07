import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LetterFrequencyService {
  calculateLetterFrequency(input: string) {
    const frequency: Record<string, number> = {};
    const normalized = input.toLowerCase().replace(/[^a-zа-яёґєії]/gi, '');

    for (const char of normalized) {
      frequency[char] = (frequency[char] || 0) + 1;
    }

    return frequency;
  }

  constructor() {}
}
