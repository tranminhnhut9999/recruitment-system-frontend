import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'utcToLocal'
})
export class UtcToLocalPipe implements PipeTransform {

  transform(value?: string | Date): string {
    if (!value) return '';

    // Convert the input to a Date object
    let date = new Date(value);

    // Check if the date is valid
    if (isNaN(date.getTime())) return '';

    // Get the date parts
    let day = this.pad(date.getUTCDate());
    let month = this.pad(date.getUTCMonth() + 1); // Months are zero-based
    let year = date.getUTCFullYear();
    let hours = this.pad(date.getUTCHours());
    let minutes = this.pad(date.getUTCMinutes());

    // Format the date
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  // Helper method to pad single digit numbers with a leading zero
  private pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }

}
