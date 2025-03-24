import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TitleValidatorService {
  validateTitle(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return { required: true };
      }
      if (value.length < 3) {
        return { minlength: { requiredLength: 3, actualLength: value.length } };
      }
      return null;
    };
  }
}
