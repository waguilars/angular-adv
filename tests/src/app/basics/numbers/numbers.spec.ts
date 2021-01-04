import { add } from './numbers';
describe('numbers tests', () => {
  it('must return 100 if number is greater than 100', () => {
    const resp = add(300);

    expect(resp).toBe(100);
  });

  it('must return number + 1 if is less than 100', () => {
    const resp = add(50);

    expect(resp).toBe(51);
  });
});
