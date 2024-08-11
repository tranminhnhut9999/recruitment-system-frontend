import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'monthToYearPipe'
})
export class MonthToYearPipePipe implements PipeTransform {

  transform(months: number): string {
    if (months >= 12) {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      const yearPart = `${years} năm`;
      const monthPart = remainingMonths > 0 ? `${remainingMonths} tháng` : '';
      return yearPart && monthPart ? `${yearPart} ${monthPart}` : `${yearPart}${monthPart}`;
    } else {
      return `${months} tháng`;
    }
  }

}
