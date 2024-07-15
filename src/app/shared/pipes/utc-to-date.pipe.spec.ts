import { UtcToDatePipe } from './utc-to-date.pipe';

describe('UtcToDatePipe', () => {
  it('create an instance', () => {
    const pipe = new UtcToDatePipe();
    expect(pipe).toBeTruthy();
  });
});
