import { HrRoleGuardPipe } from './hr-role-guard.pipe';

describe('HrRoleGuardPipe', () => {
  it('create an instance', () => {
    const pipe = new HrRoleGuardPipe();
    expect(pipe).toBeTruthy();
  });
});
