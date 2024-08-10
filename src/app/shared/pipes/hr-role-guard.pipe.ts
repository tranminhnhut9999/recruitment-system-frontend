import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hrRoleGuard'
})
export class HrRoleGuardPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
