import { loggedUser } from './booleans';
describe('Booleans tests', () => {
  it('should return true', () => {
    const resp = loggedUser();

    expect(resp).toBeTruthy();
  });
});
