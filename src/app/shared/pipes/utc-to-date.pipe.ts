import { Pipe, PipeTransform } from '@angular/core';
import {formatDate} from "@angular/common";

@Pipe({
  name: 'utcToDate'
})
export class UtcToDatePipe implements PipeTransform {

  transform(value?: string): string {
    if (!value) return '';

    const date = new Date(value);
    return formatDate(date, 'dd/MM/yyyy', 'en-US');
  }

}
