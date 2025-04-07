import { TestBed } from '@angular/core/testing';
import { LetterFrequencyService } from './letter-frequency.service';

describe('LetterFrequencyService', () => {
  let service: LetterFrequencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LetterFrequencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct frequency for English letters', () => {
    const input = 'Hello World!';
    const result = service.calculateLetterFrequency(input);
    expect(result).toEqual({
      h: 1,
      e: 1,
      l: 3,
      o: 2,
      w: 1,
      r: 1,
      d: 1,
    });
  });

  it('should ignore numbers and special characters', () => {
    const input = '12345 @!$% abc';
    const result = service.calculateLetterFrequency(input);
    expect(result).toEqual({
      a: 1,
      b: 1,
      c: 1,
    });
  });

  it('should return correct frequency for Cyrillic letters', () => {
    const input = 'Привіт Світ!';
    const result = service.calculateLetterFrequency(input);
    expect(result).toEqual({
      п: 1,
      р: 1,
      и: 1,
      в: 2,
      т: 2,
      с: 1,
      і: 2,
    });
  });

  it('should return an empty object for empty string', () => {
    const result = service.calculateLetterFrequency('');
    expect(result).toEqual({});
  });

  it('should be case insensitive', () => {
    const input = 'AaA';
    const result = service.calculateLetterFrequency(input);
    expect(result).toEqual({ a: 3 });
  });
});
