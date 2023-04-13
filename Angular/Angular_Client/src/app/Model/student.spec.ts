import { Student } from './student';

describe('Student', () => {
  it('should create an instance', () => {
    // @ts-ignore
    expect(new Student()).toBeTruthy();
  });
});
