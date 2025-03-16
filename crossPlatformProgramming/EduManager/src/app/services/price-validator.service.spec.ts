import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { PriceValidatorService } from './price-validator.service';

describe('PriceValidatorService', () => {
  let service: PriceValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceValidatorService],
    });
    service = TestBed.inject(PriceValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return required error when value is null', () => {
    const control = new FormControl(null);
    const validatorFn = service.validatePrice();
    const result = validatorFn(control);
    expect(result).toEqual({ required: true });
  });

  it('should return required error when value is undefined', () => {
    const control = new FormControl(undefined);
    const validatorFn = service.validatePrice();
    const result = validatorFn(control);
    expect(result).toEqual({ required: true });
  });

  it('should return required error when value is empty string', () => {
    const control = new FormControl('');
    const validatorFn = service.validatePrice();
    const result = validatorFn(control);
    expect(result).toEqual({ required: true });
  });

  it('should return min error when value is less than 1', () => {
    const control = new FormControl(0);
    const validatorFn = service.validatePrice();
    const result = validatorFn(control);
    expect(result).toEqual({ min: { min: 1, actual: 0 } });
  });

  it('should return min error when value is not a number', () => {
    const control = new FormControl('abc');
    const validatorFn = service.validatePrice();
    const result = validatorFn(control);
    expect(result).toEqual({ min: { min: 1, actual: 'abc' } });
  });

  it('should return null when value is a number equal to 1', () => {
    const control = new FormControl(1);
    const validatorFn = service.validatePrice();
    const result = validatorFn(control);
    expect(result).toBeNull();
  });

  it('should return null when value is a number greater than 1', () => {
    const control = new FormControl(10);
    const validatorFn = service.validatePrice();
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
});
