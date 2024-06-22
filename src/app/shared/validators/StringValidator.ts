import {AbstractControl, ValidationErrors, ValidatorFn, FormGroup} from '@angular/forms';

export class StringValidator {
  static nonEmptyString(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (typeof value === 'string' && value.trim().length > 0) {
      return null;
    }
    return { nonEmptyString: true };
  }
}
