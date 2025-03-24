import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PriceValidatorService {
  validatePrice(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined || value === '') {
        return { required: true };
      }
      if (isNaN(value) || value < 1) {
        return { min: { min: 1, actual: value } };
      }
      return null;
    };
  }
}
