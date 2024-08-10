import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'vndShorthand'
})
export class VndShorthandPipe implements PipeTransform {

  transform(value: number): string {
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + ' Tỉ';
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + ' Triệu';
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(1).replace(/\.0$/, '') + ' Ngàn';
    }
    return value.toString();
  }
}
