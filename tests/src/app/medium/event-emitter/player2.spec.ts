import { Player } from './player2';

describe('Player2 emit', () => {
  let player: Player;

  beforeEach(() => (player = new Player()));

  it('Must emmit an event when recibe dmg', () => {
    let newHp: number;
    player.changeHp.subscribe((hp: number) => (newHp = hp));

    player.takeDmg(1000);

    expect(newHp).toBe(0);
  });

  it('Must emmit an event when recibe dmg and survive when the hp is less than 100', () => {
    let newHp = 0;
    player.changeHp.subscribe((hp: number) => (newHp = hp));

    player.takeDmg(50);

    expect(newHp).toBe(50);
  });
});
