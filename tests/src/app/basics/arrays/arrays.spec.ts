import { getRobots } from './arrays';
describe('Arrays test', () => {
  it('should return at leest 3 robots', () => {
    const resp = getRobots();

    expect(resp.length).toBeGreaterThanOrEqual(3);
  });

  it('should exist megaman and ultron', () => {
    const resp = getRobots();
    expect(resp).toContain('megaman');
    expect(resp).toContain('ultron');
  });
});
