import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword');
    const confirmationPassword = control.get('confirmationPassword');

    if (!newPassword || !confirmationPassword) {
      return null;
    }

    return newPassword.value === confirmationPassword.value ? null : {passwordsMismatch: true};
  };
}
