import { message } from './string';
// describe('Strings tests');
// it('Return only a string');

describe("string's test", () => {
  it('Must return a string', () => {
    const msg = message('Will');
    expect(typeof msg).toBe('string');
  });

  it('Must return a greetting with the name', () => {
    const msg = message('Will');
    expect(msg).toContain('Saludos');
  });
});
