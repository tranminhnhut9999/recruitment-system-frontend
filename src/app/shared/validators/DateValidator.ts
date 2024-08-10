import {AbstractControl, ValidationErrors, ValidatorFn, FormGroup} from '@angular/forms';

export class DateValidator {
  static startDateNotPast(control: AbstractControl): ValidationErrors | null {
    const startDate = new Date(control.value);
    const now = new Date();
    // Remove the time part for the comparison
    startDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    return startDate < now ? {startDatePast: true} : null;
  }

  static endDateAfterStartDate(form: FormGroup): ValidationErrors | null {
    const startDateControl = form.get('startDate');
    const endDateControl = form.get('endDate');

    if (startDateControl && endDateControl) {
      const startDate = new Date(startDateControl.value);
      const endDate = new Date(endDateControl.value);
      // Remove the time part for the comparison
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      if (endDate <= startDate) {
        endDateControl.setErrors({endDateBeforeStartDate: true});
      }
      return endDate < startDate ? {endDateBeforeStartDate: true} : null;
    }
    return null;
  }
}
