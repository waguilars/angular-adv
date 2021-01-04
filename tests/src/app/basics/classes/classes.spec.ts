import { Player } from './classes';
describe('Class tests', () => {
  let p = new Player();

  beforeAll(() => {
    // console.log('beforeAll');
  });

  beforeEach(() => {
    // console.log('beforeEach');
    // p.hp = 100;
    p = new Player();
  });

  afterAll(() => {
    // console.log('afterAll');
  });

  afterEach(() => {
    // console.log('afterEach');
  });

  it('should return 80 hp if take 20 dmg', () => {
    const hp = p.takeDmg(20);

    expect(hp).toBe(80);
  });

  it('should return 50 hp if take 50 dmg', () => {
    const hp = p.takeDmg(50);

    expect(hp).toBe(50);
  });

  it('should return 0 hp if take 100 dmg or more', () => {
    const hp = p.takeDmg(200);

    expect(hp).toBe(0);
  });
});
