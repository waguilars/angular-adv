import { getRobots } from './arrays';

xdescribe('Arrays test', () => {
  it('should return at leest 3 robots', () => {
    const resp = getRobots();

    expect(resp.length).toBeGreaterThanOrEqual(3);
  });

  xit('should exist megaman and ultron', () => {
    const resp = getRobots();
    expect(resp).toContain('megaman');
    expect(resp).toContain('ultron');
  });
});
