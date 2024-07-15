import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'applicationStateLabel'
})
export class ApplicationStateLabelPipe implements PipeTransform {
  private stateMappings: { [key: string]: string } = {
    'APPLYING': 'Chưa Xử Lý',
    'EXECUTING': 'Đang Xử Lý',
    'REJECTED': 'Đã Từ Chối',
    'CONTRACTING': 'Đang Đợi Hợp Đồng',
    'INTERVIEWING': 'Đang Phỏng Vấn',
    'ACCEPTED': 'Đã Chấp Nhận'
  };

  transform(value?: string): string {
    if (!value) return '';
    return this.stateMappings[value] || value;
  }
}
