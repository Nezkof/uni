import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { TitleValidatorService } from './title-validator.service';

describe('TitleValidatorService', () => {
  let service: TitleValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TitleValidatorService],
    });
    service = TestBed.inject(TitleValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return required error when value is null', () => {
    const control = new FormControl(null);
    const validatorFn = service.validateTitle();
    const result = validatorFn(control);
    expect(result).toEqual({ required: true });
  });

  it('should return required error when value is undefined', () => {
    const control = new FormControl(undefined);
    const validatorFn = service.validateTitle();
    const result = validatorFn(control);
    expect(result).toEqual({ required: true });
  });

  it('should return required error when value is empty string', () => {
    const control = new FormControl('');
    const validatorFn = service.validateTitle();
    const result = validatorFn(control);
    expect(result).toEqual({ required: true });
  });

  it('should return minlength error when value is less than 3 characters', () => {
    const control = new FormControl('ab');
    const validatorFn = service.validateTitle();
    const result = validatorFn(control);
    expect(result).toEqual({
      minlength: { requiredLength: 3, actualLength: 2 },
    });
  });

  it('should return null when value is 3 or more characters', () => {
    const control = new FormControl('abc');
    const validatorFn = service.validateTitle();
    const result = validatorFn(control);
    expect(result).toBeNull();
  });

  it('should return null when value is longer than 3 characters', () => {
    const control = new FormControl('valid title');
    const validatorFn = service.validateTitle();
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
});
